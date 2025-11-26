export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center text-center py-6 md:px-8 md:py-8 border-t bg-muted/50">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
        <p id="foot" className="text-center text-sm leading-loose text-muted-foreground md:text-left w-full">
          © {new Date().getFullYear()} EcoCollect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
