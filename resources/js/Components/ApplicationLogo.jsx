export default function ApplicationLogo({ className }) {
    return (
        <img
            className={"block rounded-full fill-current" + className}
            src="/storage/logo.jpg"
            alt="logo"
        ></img>
    );
}
