// Define the type for the provided value
import type { InjectionKey } from 'vue'

interface ToastProvider {
  showToast: (message: string, data: ToastType) => void
}

// Create an injection key with the type
export const ToastInjectionKey: InjectionKey<ToastProvider> = Symbol('Toast')
