import Script from 'next/script';

export default function LoginFaceLayout({ children }) {
  return (
    <>
    <Script 
        src='scripts/face-api.min.js'
        strategy="afterInteractive"
      />
      <Script 
        src='scripts/script.js'
        strategy="afterInteractive"
      />
        {children}
      
    </>
  )
}
