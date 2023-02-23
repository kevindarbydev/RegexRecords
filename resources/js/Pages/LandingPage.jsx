import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function LandingPage(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Landing Page
                </h2>
            }
        >
            <Head title="Landing" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="flex flex-col items-center">
                            <h2 class="text-center text-xl">Report a bug</h2>
                            <div class="mx-auto max-w-640 w-1/2">
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSdCcwNenPaADqmsyT-XBkvM9G36hVHHWfdde-ZdE7hNfO4R2A/viewform?embedded=true"
                                    width="100%"
                                    height="645"
                                    frameborder="0"
                                    marginheight="0"
                                    marginwidth="0"
                                >
                                    Loading…
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
