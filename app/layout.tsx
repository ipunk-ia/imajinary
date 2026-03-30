import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Imajinary Coffee & Space Semarang - Kopi, Dim Sum, Live Music',
  description: 'Cafe cozy di Semarang dengan menu kopi specialty, dimsum, dan live music. Tempat nongkrong asik di Kota Semarang.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
