export default function ApplicationLogo({ className }) {
    return (
        <img
            className={"block rounded-full fill-current" + className}
            src="storage/logo-name.jpg"
            alt="logo"
        ></img>
    );
}
