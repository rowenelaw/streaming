interface ConsentNoticeProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function ConsentNotice({ onAccept, onDecline }: ConsentNoticeProps) {
  return (
    <aside
      aria-label="Analytics consent notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[#161619]/95 px-4 py-4 backdrop-blur-md sm:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-xs sm:text-sm leading-relaxed text-[#E4E4E7]">
          This class prototype records which version you saw and what you pressed, to test a
          design. Nothing about your visit leaves this browser unless you agree.
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onAccept}
            className="w-28 rounded-md border border-white/20 bg-[#232329] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2E2E36] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5E00]"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="w-28 rounded-md border border-white/20 bg-[#232329] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2E2E36] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5E00]"
          >
            Decline
          </button>
        </div>
      </div>
    </aside>
  );
}
