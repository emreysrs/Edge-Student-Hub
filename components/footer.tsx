import Link from "next/link"
import Image from "next/image"
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/ggg-logo.png"
                alt="GGG Germany GmbH - Edge Student Hub"
                width={140}
                height={46}
                className="h-12 w-auto"
              />
            </Link>
            <div className="text-sm text-muted-foreground">
              Premium student accommodation in Zossen, Germany. Your home away from home.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#rooms" className="text-muted-foreground hover:text-primary">Rooms</Link></li>
              <li><Link href="#location" className="text-muted-foreground hover:text-primary">Location</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/booking" className="text-muted-foreground hover:text-primary">Book Now</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary">Admin</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <div className="text-muted-foreground">Zossen, Brandenburg, Germany</div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:info@edgestudenthub.de" className="text-muted-foreground hover:text-primary">
                  info@edgestudenthub.de
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+49123456789" className="text-muted-foreground hover:text-primary">
                  +49 123 456 789
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Edge Student Hub GmbH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
