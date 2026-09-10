/*
  A hairline between two sections that share the same ground.

  Most sections separate themselves: the approach band is dark, services
  is tinted, the closing band is dark again. Work, testimonials and the
  FAQ all sit on the plain page, so nothing marks where one ends and the
  next begins.

  Placed by hand rather than by a CSS sibling rule, because the classes
  cannot tell you what a section looks like: the FAQ carries
  section--lit whether or not it has stripes, so "has a modifier" is not
  the same question as "has a background".
*/
export default function Divider() {
  return (
    <div className="wrap">
      <hr className="rule" />
    </div>
  );
}
