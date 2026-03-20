/**
 * SchemaScript — drops JSON-LD structured data into the page.
 * Use in any Server Component page. Accepts one or multiple schemas.
 *
 * Usage:
 *   <SchemaScript data={generateVenueSchema(venue)} />
 *   <SchemaScript data={[schema1, schema2]} />
 */

interface SchemaScriptProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaScript({ data }: SchemaScriptProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
