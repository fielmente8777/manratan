"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import FilmPlayer from "./FilmPlayer";

/** The full walkthrough player, shared by the hero and the Manratan Walk. */
export default function FilmModal({
  onClose,
  bgVideo,
  resumeBg = false,
  title = "A walk through Manratan",
  startAt = 0,
  endAt,
  chapters = true,
}: {
  onClose: () => void;
  bgVideo?: RefObject<HTMLVideoElement | null>;
  resumeBg?: boolean;
  title?: string;
  startAt?: number;
  endAt?: number;
  chapters?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = bgVideo?.current;
    const previousOverflow = document.body.style.overflow;
    background?.pause();
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
      if (resumeBg) void background?.play().catch(() => {});
    };
  }, [bgVideo, resumeBg]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-y-auto border-0 bg-ink/95 p-0 text-stone backdrop-blur-sm backdrop:bg-transparent"
    >
      <div className="mx-auto flex min-h-full max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-8 sm:py-20">
        <div className="mb-6 flex items-center justify-between gap-5">
          <p className="t-display text-xl">{title}</p>
          <button ref={closeRef} type="button" onClick={onClose} className="t-label link-line text-stone">
            Close
          </button>
        </div>
        <FilmPlayer autoPlay startAt={startAt} endAt={endAt} chapters={chapters} />
      </div>
    </dialog>,
    document.body,
  );
}
