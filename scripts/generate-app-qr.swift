import AppKit
import CoreImage
import Foundation

let destination = "https://movena.com.au/app/"
let outputPath = "public/assets/app/movena-app-page-qr.png"

guard let message = destination.data(using: .utf8),
      let filter = CIFilter(name: "CIQRCodeGenerator") else {
  fatalError("Unable to initialise the QR generator")
}

filter.setValue(message, forKey: "inputMessage")
filter.setValue("M", forKey: "inputCorrectionLevel")

guard let code = filter.outputImage else {
  fatalError("Unable to generate the QR image")
}

let moduleScale: CGFloat = 12
let quietZoneModules: CGFloat = 4
let quietZone = quietZoneModules * moduleScale
let scaled = code.transformed(
  by: CGAffineTransform(scaleX: moduleScale, y: moduleScale)
)
let translated = scaled.transformed(
  by: CGAffineTransform(translationX: quietZone, y: quietZone)
)
let extent = CGRect(
  x: 0,
  y: 0,
  width: scaled.extent.width + quietZone * 2,
  height: scaled.extent.height + quietZone * 2
)
let background = CIImage(color: CIColor.white).cropped(to: extent)
let image = translated.composited(over: background)
let context = CIContext(options: [.useSoftwareRenderer: true])
let detector = CIDetector(
  ofType: CIDetectorTypeQRCode,
  context: context,
  options: [CIDetectorAccuracy: CIDetectorAccuracyHigh]
)
let decoded = detector?.features(in: image)
  .compactMap { ($0 as? CIQRCodeFeature)?.messageString }

guard decoded == [destination] else {
  fatalError("Generated QR did not decode to the intended destination")
}

do {
  guard let cgImage = context.createCGImage(image, from: extent),
        let png = NSBitmapImageRep(cgImage: cgImage).representation(
          using: .png,
          properties: [:]
        ) else {
    fatalError("Unable to render the QR image")
  }
  try png.write(to: URL(fileURLWithPath: outputPath))
  print("Generated \(outputPath) → \(destination)")
} catch {
  fatalError("Unable to write the QR image: \(error)")
}
