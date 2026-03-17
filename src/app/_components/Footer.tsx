import { Film, Mail, Phone } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Youtube", href: "https://youtube.com" },
];

export const Footer = () => {
  return (
    <footer className="mt-12 bg-[#4f3dd1] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 md:py-12">
        <div className="grid gap-10 px-6 py-8 md:grid-cols-[1.2fr_1fr_0.9fr] md:px-10">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Film className="size-5" />
              <span className="text-2xl font-bold italic tracking-tight">
                Movie Z
              </span>
            </Link>
            <p className="text-lg text-white/90">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-medium">Contact Information</h2>
            <div className="flex items-start gap-4 text-lg text-white/92">
              <Mail className="mt-1 size-5 shrink-0" />
              <div>
                <p className="font-medium">Email:</p>
                <a href="mailto:support@movieZ.com" className="hover:underline">
                  support@movieZ.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 text-lg text-white/92">
              <Phone className="mt-1 size-5 shrink-0" />
              <div>
                <p className="font-medium">Phone:</p>
                <a href="tel:+976111234567" className="hover:underline">
                  +976 (11) 123-4567
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-medium">Follow us</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-lg text-white/92">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
