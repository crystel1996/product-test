export interface ModalInterface {
    title: string;
    textConfirm: string;
    textCancel: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    alertMessage?: string;
}