import { atom, useAtom } from 'jotai';

export const userDataAtom = atom(null)

export function useUserDataAtom(){
  return useAtom(userDataAtom)
}