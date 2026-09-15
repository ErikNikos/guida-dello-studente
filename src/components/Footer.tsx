export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Brand Section */}
          <div className="space-y-1">
            <h3 className="text-xl font-montserrat font-bold text-brand-dark">
              We Love Unict
            </h3>
            <p className="text-lg font-pacifico font-normal text-yellow-500">
              dal 2014
            </p>
          </div>

          {/* Tagline */}
          <p className="text-sm font-medium text-gray-600">
            Al servizio degli studenti
          </p>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            Copyright © 2026 We Love Unict. Tutti i diritti riservati sull'applicazione.
          </p>
        </div>
      </div>
    </footer>
  );
}