export async function handleError(response: Response): Promise<Error> {
	// const responseBody = await response.text();
	const statusCode = response.status;

	const errorMessages: { [key: number]: string } = {
		400: "Bad request.",
	};

	const errorMessage =
		errorMessages[statusCode] || "An unknown error occurred.";

	console.error("Error fetching data:", errorMessage);

	return new Error(errorMessage);
}

