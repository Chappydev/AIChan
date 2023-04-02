export const getChatResponse = async (keyArr) => {
  const [url, content] = keyArr;
  console.log(`url: ${url}, content: `, content);
  const body = JSON.stringify({
    content: content,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      const error = (data && data.message) || response.status;
      throw new Error(error);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};
