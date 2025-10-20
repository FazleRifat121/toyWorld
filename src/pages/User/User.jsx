import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/clerk-react";

export default function User() {
	return (
		<div className="flex items-center gap-4">
			<SignedIn>
				<UserButton
					appearance={{
						elements: {
							userButtonAvatarBox: "w-10 h-10",
							userButtonAvatar: "rounded-full",
						},
					}}
				/>
			</SignedIn>

			<SignedOut>
				<SignInButton>
					<button className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition">
						Sign In
					</button>
				</SignInButton>

				<SignUpButton>
					<button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition">
						Sign Up
					</button>
				</SignUpButton>
			</SignedOut>
		</div>
	);
}
