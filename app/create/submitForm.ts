export const submitForm = async (formData: { eoaAddress:string, contractAddress:string, name: string; purpose?: string; description?: string }) => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/make-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit form");
    }
  
    return response.json();
  };
  