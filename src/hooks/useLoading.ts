export default function useLoading() {
  const loading = ref(false)
  const start = () => {
    loading.value = true
  }
  const stop = () => {
    loading.value = false
  }
  return {
    loading: readonly(loading),
    start,
    stop
  }
}
