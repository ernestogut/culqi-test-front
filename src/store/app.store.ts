import { inject } from 'vue'
import { defineStore } from 'pinia'
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
export const useAppStore = defineStore('app', () => {
    const loader = useLoading();
    const swal: any = inject('$swal')
    const showSuccessSwal = (title: string = 'Felicidades!', text: 'Se ha ejecutado correctamente', icon: 'success', options: any = {}): Promise<any> => {
        return swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'OK',
            ...options
        })
    }

    const showErrorSwal = (
        title: string = 'Error!',
        text: string = 'Ha ocurrido un error',
        icon: 'error',
        options: any = {}
    ): Promise<any> => {
        return swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'OK',
            ...options
        })
    }



    const addPreloader = () => {
        loader.show({
            container: null,
            canCancel: false,
        });
    }
    const removePreloader = () => {
        loader.hide();
    }
    return { addPreloader, removePreloader, showSuccessSwal, showErrorSwal }
})
