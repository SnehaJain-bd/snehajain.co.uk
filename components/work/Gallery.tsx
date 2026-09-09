import Image from 'next/image';
import { packGallery, type GalleryImage } from '@/lib/projects';
import { Stagger, StaggerItem } from '@/components/motion/primitives';

/**
 * Used inside case study MDX as:
 *   <Gallery images={[{ src, alt }, { src, alt, wide: true }]} />
 *
 * Spans are worked out by packGallery so no row is ever left half empty.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const packed = packGallery(images);
  if (!packed.length) return null;

  return (
    <section className="section section--tight">
      <div className="wrap">
        <Stagger className="case-gallery" gap={0.07}>
          {packed.map((g) => (
            <StaggerItem
              key={g.src}
              as="div"
              className={g.span === 'half' ? undefined : g.span}
            >
              <figure>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1600}
                  height={1200}
                  sizes={
                    g.span === 'wide'
                      ? '(max-width: 640px) 100vw, 1200px'
                      : g.span === 'third'
                        ? '(max-width: 640px) 100vw, 400px'
                        : '(max-width: 640px) 100vw, 600px'
                  }
                />
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
