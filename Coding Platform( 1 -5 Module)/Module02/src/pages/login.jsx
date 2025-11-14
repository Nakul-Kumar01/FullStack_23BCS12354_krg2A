import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';  // to connect zod with reactformhook
import { z } from 'zod'; // or 'zod/v4'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../store/authSlice';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


let showError = false;

// SchemaValidation for Login form
const loginSchema = z.object({
    emailId: z.string().email("Enter valid email"),
    password: z.string().min(8, "Password should contain atleast 8 char"),
});


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    const onSubmit = (data) => {
        // console.log(data);
        dispatch(loginUser(data));
        showError = true;
    }

    return (
        <div className='max-w-screen w-full h-screen flex flex-col items-center justify-center  bg-gradient-to-b from-[#061021] via-[#071428] to-[#08122a] relative overflow-hidden'>

            <div className="absolute flex bottom-0 right-0 w-[300px] h-[500px] bg-pink-600/30 rounded-full blur-[180px]" />
            <DotLottieReact
                src="https://lottie.host/3be52818-83fe-4b78-8e99-2447c8113a17/i6PoGqcCHf.lottie"
                loop
                autoplay
                className='w-40 h-auto '
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card flex-shrink-0  w-full max-w-md shadow-2xl bg-[#061021]"
            >

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] z-[-1] bg-[#6A56F4]/30 rounded-full blur-[180px]" />
                <div className="card-body ">
                    <h2 className="card-title text-3xl font-bold flex justify-center  mb-6 text-primary">
                        NexLoop
                    </h2>

                    {/* Email Field */}
                    <div className="form-control flex flex-col items-center  mb-6">
                        <input
                            {...register('emailId')}
                            type="email"
                            placeholder="Enter your email"
                            className={`input input-bordered ${errors.emailId ? 'input-error' : ''}`}
                        />
                        {errors.emailId && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.emailId.message}</span>
                            </label>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-control flex flex-col items-center px-10 mb-6">
                        <div className='relative w-full'>
                            <input
                                {...register('password')}
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className={`input input-bordered pr-10 w-full ${errors.password ? 'input-error' : ''}`}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 z-30 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors.password.message}</span>
                            </label>
                        )}
                    </div>

                    {error && showError && (
                        <label className="label flex justify-center">
                            <span className="label-text-alt text-error ">{error}</span>
                        </label>
                    )}

                    <div className="form-control flex justify-center">
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "" : "Login"}
                        </button>
                    </div>

                    <div className="divider">OR</div>

                    <div className="flex justify-center gap-4">
                        <button type="button" className="btn btn-outline btn-ghost">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                            </svg>
                            LinkedIn
                        </button>
                        <button type="button" className="btn btn-outline btn-ghost">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    <p className="text-center mt-4">
                        New User?
                        <Link to={'/signup'} className='link link-primary'> signup</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}