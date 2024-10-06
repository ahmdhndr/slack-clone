/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import React from 'react';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = { name: string };
type ResponseType = Id<'workspaces'> | null;

type Options = {
  onSuccess?: (id: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkspace = () => {
  const [data, setData] = React.useState<ResponseType>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [status, setStatus] = React.useState<
    'pending' | 'success' | 'error' | 'settled' | null
  >(null);

  const isPending = React.useMemo(() => status === 'pending', [status]);
  const isSuccess = React.useMemo(() => status === 'success', [status]);
  const isError = React.useMemo(() => status === 'error', [status]);
  const isSettled = React.useMemo(() => status === 'settled', [status]);

  const mutation = useMutation(api.workspaces.create);

  const mutate = React.useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus('pending');

        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        options?.onError?.(error as Error);

        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
