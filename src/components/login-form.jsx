"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from 'axios';

// Utility function for className merging
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const router = useRouter();

  const handleFocus = (fieldId) => setFocusedField(fieldId);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Logging in:', { email, password });
      const response = await axios.post('/api/user/login', {
        email,
        password
      });

      console.log('Login successful:', response.data);
      console.log(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.user.token);
      router.push("/home");
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className={classNames(
        "flex flex-col   bg-gradient-to-b  p-6",
        className
      )} 
      {...props}
    >
      <Card className="overflow-hidden h-full shadow-xl backdrop-blur-sm  border-t border-primary/20 max-w-md mx-auto w-full">
        <CardContent className="p-0">
          <form className="p-8  " onSubmit={handleSubmit}>
            <motion.div variants={staggerContainer} className="flex flex-col gap-8">
              <motion.div 
                variants={fadeInUp}
                className="text-center space-y-3"
              >
                <div className="inline-block p-3 rounded-full  mb-4">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-4xl"
                  >
                    🔐
                  </motion.span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-balance text-muted-foreground max-w-md mx-auto">
                  Login to your Acme Inc account to access your dashboard and projects.
                </p>
              </motion.div>

              {error && (
                <motion.div 
                  variants={fadeInUp}
                  className="text-red-500 text-center p-3 bg-red-100/30 backdrop-blur-sm rounded-lg border border-red-200/50"
                >
                  {error}
                </motion.div>
              )}

              <motion.div variants={fadeInUp} className="grid gap-6">
                <div className="grid gap-2 group">
                  <Label 
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <span className="text-lg">📧</span>
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      // required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className={classNames(
                        "transition-all duration-300",
                        "border-muted-foreground/20",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20",
                        "bg-card/50 backdrop-blur-sm",
                        focusedField === 'email' && "scale-[1.02]"
                      )}
                    />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>

                <div className="grid gap-2 group">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor="password"
                      className="flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <span className="text-lg">🔒</span>
                      Password
                    </Label>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="#" 
                      className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                    >
                      Forgot your password?
                    </motion.a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      // required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => handleFocus('password')}
                      onBlur={handleBlur}
                      className={classNames(
                        "transition-all duration-300",
                        "border-muted-foreground/20",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20",
                        "bg-card/50 backdrop-blur-sm",
                        focusedField === 'password' && "scale-[1.02]"
                      )}
                    />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: focusedField === 'password' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className={classNames(
                    "w-full h-12 text-lg transition-all duration-300",
                    "bg-primary hover:bg-primary/90",
                    "shadow-lg hover:shadow-primary/25",
                    loading && "animate-pulse"
                  )}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
              >
                <span className="relative z-10 bg-card/80 backdrop-blur-sm px-2 text-muted-foreground">
                  Or continue with
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full bg-card/50 backdrop-blur-sm hover:bg-primary/5 border-muted-foreground/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor" />
                    </svg>
                    <span className="sr-only">Login with Apple</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full bg-card/50 backdrop-blur-sm hover:bg-primary/5 border-muted-foreground/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor" />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full bg-card/50 backdrop-blur-sm hover:bg-primary/5 border-muted-foreground/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                      <path
                        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                        fill="currentColor" />
                    </svg>
                    <span className="sr-only">Login with Meta</span>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="text-center text-sm"
              >
                Don&apos;t have an account?{" "}
                <motion.a 
                  whileHover={{ scale: 1.05 }} 
                  href="/register" 
                  className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                >
                  Sign up
                </motion.a>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
      
      <motion.div
        variants={fadeInUp}
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary max-w-md mx-auto pt-6"
      >
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </motion.div>
    </motion.div>
  );
}

export default LoginForm;