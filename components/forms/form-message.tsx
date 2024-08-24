export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"error" in message && (
        <div className="text-error font-bold border-l-2 border-error px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-white font-bold border-l-2 px-4">
          {message.message}
        </div>
      )}
    </div>
  );
}

export function ModalMessage({ message }: { message: Message }) {
  return (
    "success" in message && (
      <dialog open className="modal bg-black/30">
        <div className="modal-box bg-primary-content flex flex-col items-center justify-center h-96">
          <div className="flex justify-center ">
            <div className="size-20 ring-4 ring-white flex justify-center items-center rounded-full text-4xl text-white">
              <i className="fa-solid fa-unlock"></i>
            </div>
          </div>
          <h3 className="font-bold text-xl text-center pt-3 text-white">
            Reset your password
          </h3>
          <div className="divider px-5 my-3"></div>
          <p className="px-5 mb-5">{message.success}</p>
          <a
            href="https://mail.google.com"
            className="btn btn-secondary font-bold rounded-md link"
          >
            Check your email
          </a>
        </div>
      </dialog>
    )
  );
}
