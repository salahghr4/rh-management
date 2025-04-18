import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { TERipple } from "tw-elements-react";
import img from "../../../Assest/img/authImg.avif";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className=" h-screen flex  ">
            <Head title="Log in" />

            <div className="flex flex-1 justify-center items-center h-full pt-36">
                <div className=" my-auto w-full lg:w-[50%] flex-1 flex flex-col gap-16   justify-center h-full ">
                    <div className=" flex items-center justify-center">
                        <Link href="/">
                            <ApplicationLogo className="w-[300px] fill-current text-gray-500" />
                        </Link>
                    </div>

                    <div className="flex justify-center flex-1 px-10 lg:px-0">
                        <form
                            onSubmit={submit}
                            className=" lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto  px-5 "
                        >
                            <div className="flex flex-col items-center gap-2 text-center mb-10">
                                <h1 className="text-2xl font-bold text-primary">
                                    Connectez-vous à votre compte
                                </h1>
                                <p className="text-balance text-sm ">
                                    Entrez votre e-mail ci-dessous pour vous
                                    connecter à votre compte
                                </p>
                            </div>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className={`mt-1 block w-full ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className={`mt-1 block w-full ${
                                        errors.password ? "border-red-500" : ""
                                    }`}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-between items-center mt-4 gap-2">
                                <div className="block ">
                                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            id="checkboxDefault"
                                        />
                                        <label
                                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="checkboxDefault"
                                        >
                                            Se souvenir de moi
                                        </label>
                                    </div>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="flex justify-end underline text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </div>

                            <div className="w-full mt-4">
                                <TERipple
                                    rippleColor="light"
                                    className="w-full"
                                >
                                    <PrimaryButton
                                        className="w-full justify-center rounded bg-primary px-7  py-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Connexion en cours..."
                                            : "Se connecter"}
                                    </PrimaryButton>
                                </TERipple>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className=" flex-1 hidden lg:block">
                {/* {children} */}
                <img
                    src={img}
                    alt="image"
                    className="w-full h-screen brightness-70"
                />
            </div>
        </div>
    );
}
