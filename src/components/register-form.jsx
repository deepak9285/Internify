"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export function RegisterForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    github_username: '',
    bio: '',
    profile_picture: '',
    skills: '',
    level: '',
    role: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (fieldId) => setFocusedField(fieldId);
  const handleBlur = () => setFocusedField(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSelectChange = (value, field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('User created successfully:', data);
    } catch (error) {
      console.error('Error creating user:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: '👤' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'm@example.com', icon: '📧' },
    { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', icon: '🔒' },
    { id: 'mobile', label: 'Mobile Number', type: 'number', placeholder: '123-456-7890', icon: '📱' },
    { id: 'github_username', label: 'GitHub Username', type: 'text', placeholder: 'johndoe', icon: '🐙' },
    { id: 'bio', label: 'Bio', type: 'text', placeholder: 'A bit about yourself...', icon: '📝' },
    { id: 'profile_picture', label: 'Profile Picture URL', type: 'url', placeholder: 'https://example.com/profile.jpg', icon: '🖼️' },
    { id: 'skills', label: 'Skills (comma separated)', type: 'text', placeholder: 'JavaScript, React, Node.js', icon: '💻' }
  ];

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className={classNames(
        "flex flex-col gap-6 min-h-screen bg-gradient-to-b from-background to-background/80 p-6",
        className
      )} 
      {...props}
    >
      <Card className="overflow-hidden shadow-xl backdrop-blur-sm bg-card/95 border-t border-primary/20">
        <CardContent className="p-0">
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            <motion.div variants={staggerContainer} className="flex flex-col gap-8">
              <motion.div 
                variants={fadeInUp}
                className="text-center space-y-3"
              >
                <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-4xl"
                  >
                    ⚡
                  </motion.span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  Create Your Account
                </h1>
                <p className="text-balance text-muted-foreground max-w-md mx-auto">
                  Join our community to unlock premium features and connect with other developers.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    variants={fadeInUp}
                    className="group"
                  >
                    <div className="grid gap-2">
                      <Label 
                        htmlFor={field.id}
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <span className="text-lg">{field.icon}</span>
                        {field.label}
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={['name', 'email', 'password', 'mobile'].includes(field.id)}
                          value={formData[field.id]}
                          onChange={handleChange}
                          onFocus={() => handleFocus(field.id)}
                          onBlur={handleBlur}
                          className={classNames(
                            "transition-all duration-300",
                            "border-muted-foreground/20",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20",
                            "bg-card/50 backdrop-blur-sm",
                            focusedField === field.id && "scale-[1.02]"
                          )}
                        />
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === field.id ? 1 : 0 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  variants={fadeInUp}
                  className="grid gap-2"
                >
                  <Label htmlFor="level" className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    Skill Level
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'level')}>
                    <SelectTrigger className="bg-card/50 backdrop-blur-sm border-muted-foreground/20">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="grid gap-2"
                >
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <span className="text-lg">👨‍💻</span>
                    Role
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'role')}>
                    <SelectTrigger className="bg-card/50 backdrop-blur-sm border-muted-foreground/20">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <motion.div 
                              variants={fadeInUp}
                              className="text-center text-sm"
                            >
                              Already have an account?{" "}
                              <motion.a 
                                whileHover={{ scale: 1.05 }} 
                                href="/login" 
                                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                              >
                                Sign in
                              </motion.a>
                            </motion.div>

              <motion.div variants={fadeInUp}>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={classNames(
                    "w-full h-12 text-lg transition-all duration-300",
                    "bg-primary hover:bg-primary/90",
                    "shadow-lg hover:shadow-primary/25",
                    isSubmitting && "animate-pulse"
                  )}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
      
      <motion.div
        variants={fadeInUp}
        className="text-center text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary"
      >
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </motion.div>
    </motion.div>
  );
}

export default RegisterForm;