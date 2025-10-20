import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
				<SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
			</div>
		</div>
	);
}

export default SignInPage;
