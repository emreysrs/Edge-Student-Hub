export function LocationSection() {
  return (
    <section id="location" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Perfect Location</h2>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Located in Zossen, Brandenburg, just 30 minutes from Berlin city center by train.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.4739684869867!2d13.437821576709633!3d52.21997387197585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a86b937f249f3b%3A0x162aa52d002ddfd4!2sEdge%20Student%20Hub%20GmbH!5e0!3m2!1sen!2sde!4v1705456573123!5m2!1sen!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Getting Around</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium">Zossen Train Station</div>
                    <div className="text-sm text-muted-foreground">5 minutes walk</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium">Berlin City Center</div>
                    <div className="text-sm text-muted-foreground">30 minutes by train (RB22)</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium">Nearest Supermarket</div>
                    <div className="text-sm text-muted-foreground">10 minutes walk (REWE)</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium">Berlin Universities</div>
                    <div className="text-sm text-muted-foreground">40-50 minutes by public transport</div>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3">Nearby Attractions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Tropical Islands Resort (20 min drive)</li>
                <li>• Wünsdorf Bunker Museum (15 min drive)</li>
                <li>• Beautiful walking trails and nature</li>
                <li>• Local cafes and restaurants</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
