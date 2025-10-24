import { useRouter } from 'vue-router'

export const useInitConfirmation = () => {
  const router = useRouter();

  return (token: string) => {
    router.push({ query: { confirmationToken: token } });
  }
}