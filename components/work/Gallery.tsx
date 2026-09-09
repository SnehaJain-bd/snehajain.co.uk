import Image from 'next/image';
import { packGallery, type GalleryImage } from '@/lib/projects';
import { Stagger, StaggerItem } from '@/components/motion/primitives';

/**
 * Used inside case study MDX as:
 *   <Gallery images={[{ src, alt }, { src, alt, wide: true }]} />
 *
 * The span class goes on the grid child, not the figure inside it.
 * Putting it on the figure left the grid child at one column of six,
 * which is what made the half width images render tiny.
 */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const packed = packGallery(images);
  if (!packed.length) return null;

  return (
    <section className="section section--tight">
      <div className="wrap">
        <Stagger className="case-gallery" gap={0.07}>
          {packed.map((g) => (
            <StaggerItem key={g.src} as="div" className={g.span}>
              <figure>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1600}
                  height={1200}
                  quality={82}
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
