"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

// The prupose of this component is to load client components inside this one and be used/called
// inside a server component (for example in layout.tsx)
function ClientProvider() {
  return (
    <>
      <Toaster position="top-right" />
      {/* here, we can load diferent client component libraries to be used in a server component */}
      {/* Client library 1 */}
      {/* Client library 2 */}
      {/* ..... */}
      {/* Client library n */}
    </>
  );
}

export default ClientProvider;
