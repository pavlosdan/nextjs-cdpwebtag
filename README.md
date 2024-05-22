# CDPWebtag

CDPWebtag is a React component designed to integrate Acquia CDP Webtag into your Next.js applications seamlessly. It dynamically fetches and configures the necessary `$A1Config` variable required for CDP Webtag operations.

## Installation

You can install the package via npm:

```bash
npm install @acquia/cdpwebtag
```
## Environment Setup
Before using the CDPWebtag component, you need to configure your environment variables. Create a .env.local file in the root of your Next.js project and populate it with the following variables:
```
NEXT_PUBLIC_A1_DOMAIN=.acquia.com
NEXT_PUBLIC_A1_TENANT_ID=999
NEXT_PUBLIC_A1_HOST=//url.endpoint.com
NEXT_PUBLIC_AUTH_USERNAME=your_username
NEXT_PUBLIC_AUTH_PASSWORD=your_password
```
## Explanation of Environment Variables
- **NEXT_PUBLIC_A1_DOMAIN**: The main domain for your Acquia CDP instance (e.g., .acquia.com).
- **NEXT_PUBLIC_A1_TENANT_ID**: Your static tenant ID (e.g., 999).
- **NEXT_PUBLIC_A1_HOST**: The service endpoint URL according to your hosted environment and cloud region (e.g., //url.endpoint.com).
- **NEXT_PUBLIC_AUTH_USERNAME**: Your username for authenticating with the Acquia CDP service.
- **NEXT_PUBLIC_AUTH_PASSWORD**: Your password for authenticating with the Acquia CDP service.

## Usage
To use the CDPWebtag component in your Next.js application, you need to integrate it within the app directory if you are using the App Router. Here’s how you can do it:

### Step 1: Create the CDPWebtag Component
First, ensure you have the CDPWebtag component in your application:

```tsx
// app/layout.tsx
import { ReactNode } from 'react';
import { CDPWebtag } from '@acquia/cdpwebtag';
import './globals.css';

export const metadata = {
  title: 'My Next.js App',
  description: 'A description of my app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CDPWebtag />
        {children}
      </body>
    </html>
  );
}
```
### Step 2: Ensure Your Environment Variables are Set
Make sure your .env.local file is properly configured with the necessary environment variables as described above.
