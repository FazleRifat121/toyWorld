import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<div className="w-full max-w-md p-6 bg-gray-800 rounded-lg">
				<SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
			</div>
		</div>
	);
}

export default SignUpPage;
