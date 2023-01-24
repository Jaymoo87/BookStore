import Swal from "sweetalert2";

export function SwalError(error: any) {
  Swal.fire({
    title: "Error!",
    icon: "error",
    text: error.message,
    position: "top-right",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

export function SwalSuccess(str: string, title: string = "Success!") {
  Swal.fire({
    title,
    icon: "success",
    text: str,
    position: "top-right",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

export function SwalWarn(str: string, title: string = "OOPSY!") {
  Swal.fire({
    title,
    icon: "error",
    text: str,
    position: "top-right",
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

export default {
  SwalError,
  SwalSuccess,
  SwalWarn,
};
