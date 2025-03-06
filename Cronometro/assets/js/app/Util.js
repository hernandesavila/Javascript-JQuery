var Util = {
    toast: Swal.mixin(),
    showSucessMessage: function (title, text) {
        this.toast.fire({
            title: title,
            text: text,
            icon: "success"
        });
    },
    showErrorMessage: function (title, text) {
        this.toast.fire({
            title: title,
            text: text,
            icon: "error"
        });
    },
    showAlertMessage: function (title, text) {
        this.toast.fire({
            title: title,
            text: text,
            icon: "warning"
        });
    },
    showQuestion: function (title, text, callbackConfirm, callbackCancel) {
        this.toast.fire({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                if(callbackConfirm != null)
                    callbackConfirm();
            } else {
                if(callbackCancel != nul)
                    callbackCancel();
            }
          });
    }
}