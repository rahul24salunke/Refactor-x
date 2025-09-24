import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import {
  Terminal,
  Play,
  Loader2,
  Code2,
  Settings,
  Copy,
  RefreshCw,
  Zap,
  Lightbulb,
  Wrench,
  Eye,
  Sparkles,
  Plus,
  X,
  Upload,
  Download,
  Send,
  Sun,
  Moon,
  Check,
  CheckCircle,
  Clock,
  Code
} from "lucide-react";
import { Input } from "../ui/input";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

const STARTERS = {
  python: "print(\"Hello from Python!\")\nname = input('Your name: ')\nprint('Hi, ' + name)",
  java: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello from Java!\");\n  }\n}",
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n  ios::sync_with_stdio(false); cin.tie(nullptr);\n  cout << \"Hello from C++!\\n\";\n  return 0;\n}",
};

const LANGUAGE_CONFIGS = {
  python: {
    color: "bg-blue-500",
    accent: "border-blue-400",
    name: "Python 3",
    ext: "py"
  },
  java: {
    color: "bg-orange-500",
    accent: "border-orange-400",
    name: "Java",
    ext: "java"
  },
  cpp: {
    color: "bg-purple-500",
    accent: "border-purple-400",
    name: "C++",
    ext: "cpp"
  }
};

const modules = {
  generate: { name: "Generate", icon: <Lightbulb className="w-4 h-4" />, accent: "from-blue-500 to-indigo-500" },
  modify: { name: "Modify", icon: <Wrench className="w-4 h-4" />, accent: "from-green-500 to-emerald-500" },
  review: { name: "Review", icon: <Eye className="w-4 h-4" />, accent: "from-purple-500 to-pink-500" },
  explain: { name: "Explain", icon: <Sparkles className="w-4 h-4" />, accent: "from-orange-500 to-red-500" },
  Run: { name: "Run", icon: <Play className="w-4 h-4" />, accent: "from-teal-500 to-cyan-500" },
};

export default function CodeRunner() {
  const [activeTab, setActiveTab] = useState("generate");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(STARTERS["python"]);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState(false);
  const [codeTheme, setCodeTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [modifyOutput, setModifyOutput] = useState("");
  const [modifyLoading, setModifyLoading] = useState(false);
  const [codeExplain, setCodeExplain] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const outputRef = useRef(null);
  const { theme, setTheme } = useTheme();

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/run`, { language, code, stdin });
      // console.log(res.data.result.stdout);

      setOutput(res.data.result.stdout);
    } catch (err) {
      console.log(err);
      setOutput(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };


  const handleExplain = async () => {
    setExplainLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/explain`, { prompt: code });
      setCodeExplain(res.data.response);
      // console.log(res.data.response);
    } catch (error) {
      console.log(error);
    }
    setExplainLoading(false);
  }

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(STARTERS[newLanguage]);
    setOutput("");
  };


  const handleModify = async () => {
    setModifyLoading(true);
    try {
      const prompt = userInput + " for the following code:\n" + code;
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/modify`, { prompt });
      setModifyOutput(res.data.response);
      console.log(res.data.response);
    } catch (error) {
      console.log(error);
      setModifyLoading(false);
    }
      setModifyLoading(false);

  }

  // const handleRefactor = async (promptext = "Clean up and restructure") => {
  //   try {
  //     const prompt = promptext + " for the following code:\n" + code;
  //     const res = await axios.post(`${import.meta.env.VITE_API_URL}/modify`, { prompt });
  //     setModifyOutput(res.data.response);
  //     console.log(res.data.response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handlereview = async () => {
    setReviewLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/review`, { prompt: code });
      setReview(res.data.response);
      console.log(res.data.response);
    } catch (error) {
      console.log(error);
      setReviewLoading(false);
    }
    setReviewLoading(false);
  }
  const handleSubmit = async () => {
    // Placeholder for future functionality
    setGenerate(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/generate`, { prompt: input });
      console.log(res.data.code);

      setLanguage(res.data.language.toLowerCase());
      setCode(res.data.code)
    } catch (error) {
      console.log(error);
      setGenerate(false);
    } finally {
      setGenerate(false);
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const saveCodeToFile = () => {
    const config = LANGUAGE_CONFIGS[language];
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${config.ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };


  const clearOutput = () => {
    setOutput("");
  };

  const currentConfig = LANGUAGE_CONFIGS[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-7xl mx-auto ">
        {/* NavBar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}    // Start slightly above
          animate={{ y: 0, opacity: 1 }}      // Drop down + fade in
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col md:flex-row justify-center items-center gap-2 top-0 left-0 w-full z-50 fixed px-2 mb-6 mt-2"
        >
          {/* Tabs */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-wrap justify-center md:justify-start space-x-2 bg-white/30 dark:bg-slate-700/30 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-white/20 dark:border-slate-600/20"
          >
            {Object?.keys(modules)?.map((key, index) => (
              <motion.button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setOutput("");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full transition-all ${activeTab === key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-200 hover:text-blue-500"
                  }`}
              >
                {modules[key]?.icon}
                <span className="text-sm font-medium">{modules[key]?.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Dark Mode Toggle (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
            className="hidden md:flex h-12 w-12 p-2 rounded-full shadow-lg items-center justify-center"
          >
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileTap={{ scale: 0.9 }}
              className="h-12 w-12 rounded-full cursor-pointer bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 p-0 transition"
            >
              {theme === "dark" ? (
                <Moon className="h-10 w-10" />
              ) : (
                <Sun className="h-10 w-10" />
              )}
            </Button>
          </motion.div>
        </motion.div>


        <div className="grid grid-cols-1 xl:grid-cols-3 mt-15 gap-6">
          {/* Code Editor Section */}
          <div className="xl:col-span-2 space-y-6 ">
            {/* Controls */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  {/* Left Section */}
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${currentConfig?.color}`}></div>
                    <CardTitle className="text-lg">
                      {currentConfig?.name}
                    </CardTitle>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-36 sm:w-40 border-slate-300 focus:border-blue-500 cursor-pointer">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Settings Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="cursor-pointer" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFontSize(Math.min(fontSize + 2, 24))}>
                          <Plus className="w-4 h-4 mr-2" />
                          Increase Font Size ({fontSize}px)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFontSize(Math.max(fontSize - 2, 10))}>
                          <X className="w-4 h-4 mr-2" />
                          Decrease Font Size ({fontSize}px)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={saveCodeToFile}>
                          <Download className="w-4 h-4 mr-2" />
                          Save File
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Execute Button */}
                    <Button
                      onClick={runCode}
                      disabled={loading}
                      className={`${loading
                        ? "bg-slate-400"
                        : "cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        } text-white shadow-lg transition-all duration-200`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Execute
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>


            {/* Code Editor */}
            <Card className={`shadow-xl border-0 bg-white dark:bg-slate-800 ${currentConfig?.accent} border-l-4`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Code2 className="w-4 h-4" />
                    Code Editor
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(code)}
                      className="h-10 w-10 p-0 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Select value={codeTheme} onValueChange={setCodeTheme}>
                      <SelectTrigger className="w-24 h-8 text-xs cursor-pointer">
                        <Settings className="w-3 h-3 cursor-pointer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vs-dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="hc-black">High Contrast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-b-lg overflow-hidden">
                  <Editor
                    height="500px"
                    language={language === "cpp" ? "cpp" : language}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme={codeTheme}
                    options={{
                      minimap: { enabled: true },
                      fontSize: fontSize,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: "on",
                      folding: true,
                      bracketMatching: "always",
                      autoIndent: "full"
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Input/Output Section */}
          <div className="space-y-6">
            {/* Input Section */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-slate-600" />
                  Input
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter program input here..."
                  className="min-h-[120px] font-mono text-sm border-slate-300 focus:border-blue-500"
                />
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-600" />
                    Output
                  </CardTitle>
                  <div className="flex gap-1 items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(output)}
                      disabled={!output}
                      className="h-10 w-10 cursor-pointer p-0 "
                    >
                      <Copy className="w-4 h-4 cursor-pointer " />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearOutput}
                      disabled={!output}
                      className="h-8 w-8 p-0 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 cursor-pointer" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={outputRef}
                  className="bg-slate-900 text-green-400 p-4 rounded-lg min-h-[200px] max-h-[300px] overflow-auto font-mono text-sm border border-slate-700"
                >
                  {loading ? (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Executing code...
                    </div>
                  ) : output ? (
                    <pre className="whitespace-pre-wrap text-left">{output}</pre>
                  ) : (
                    <div className="text-slate-500 italic">
                      Output will appear here after execution...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Status:</span>
                  <Badge
                    variant={loading ? "secondary" : "default"}
                    className={loading ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}
                  >
                    {loading ? (<Loader2 className="w-4 h-4 mr-2 animate-spin inline-block" />) : <CheckCircle className="w-4 h-4 mr-2 inline-block" />}
                    {loading ? "Running" : " Ready"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Generation Section */}
        {activeTab === "generate" && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl z-50">
            <Card className="bg-white/30 dark:bg-slate-700/30 backdrop-blur-md shadow-lg border-0 rounded-2xl overflow-hidden transition-all duration-300">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Enhanced Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        AI Code Generator
                      </Label>
                      <p className="text-sm text-slate-800 dark:text-slate-400">
                        Describe what you want to code and AI will generate it for you
                      </p>
                    </div>
                  </div>

                  {/* Input Area with Better UX */}
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <Input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder="Example: Write a Python function to find the longest common subsequence..."
                        className="h-10 resize-none border-slate-800 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 rounded-full"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-800">
                          Press Ctrl+Enter to generate
                        </span>
                        <span className="text-xs text-slate-800">
                          {input?.length}/500 characters
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={generate || !input.trim()}
                      size="lg"
                      className={`${generate || !input?.trim()
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r mb-5 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                        } text-white cursor-pointer font-medium mb-5 shadow-lg transition-all duration-200 rounded-xl px-8 py-3`}
                    >
                      {generate ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Quick Examples (Hidden on Mobile) */}
                  <div className="hidden md:flex flex-wrap gap-2 mt-4">
                    <span className="text-sm text-slate-800 dark:text-slate-400">Quick examples:</span>
                    {[
                      "Binary search algorithm",
                      "REST API with authentication",
                      "Sorting algorithms comparison",
                      "Database connection setup"
                    ].map((example, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => setInput(example)}
                        className="text-xs h-7 rounded-full hover:bg-blue-50 dark:hover:bg-slate-700"
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}


        {/* Enhanced Module-specific Content */}
        {activeTab === "modify" && (
          <>
            <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Code Modification Tools
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Refactor, optimize, and enhance your existing code
                    </p>
                  </div>
                </div>

                {/* Input box for user code/instructions */}
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Paste your code or instructions here..."
                  className="w-full p-3 mb-4 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={5}
                />

                {/* Feature buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="p-4 h-auto flex-col items-start cursor-pointer"
                  >
                    <Zap className="w-5 h-5 mb-2 text-yellow-500" />
                    <span className="font-medium">Optimize Performance</span>
                    <span className="text-xs text-slate-500 mt-1">
                      Improve code efficiency and speed
                    </span>
                  </Button>

                  <Button
                    variant="outline"

                    className="p-4 h-auto flex-col items-start cursor-pointer"
                  >
                    <RefreshCw className="w-5 h-5 mb-2 text-blue-500" />
                    <span className="font-medium">Refactor Code</span>
                    <span className="text-xs text-slate-500 mt-1">Clean up and restructure</span>
                  </Button>

                  <Button
                    variant="outline"

                    className="p-4 h-auto flex-col items-start cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 mb-2 text-purple-500" />
                    <span className="font-medium">Enhance Code</span>
                    <span className="text-xs text-slate-500 mt-1">Add improvements & suggestions</span>
                  </Button>
                </div>

                {/* Main trigger button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleModify}
                    disabled={modifyLoading}
                    className="px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    {modifyLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Modify Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>



            {/* Output Panel */}
            {modifyOutput && (
              <Card className="mt-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Modification Output</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Results from your code modification operation</p>
                    </div>
                  </div>
                  <div className="bg-white flex justify-between dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                    <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto">
                      {modifyOutput}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(modifyOutput)}
                      className="h-10 w-10 p-0 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-slate-500">
                      Generated at {new Date().toLocaleTimeString()}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setModifyOutput('')}
                      className="cursor-pointer text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-4 h-4 mr-1 cursor-pointer" />
                      Clear Output
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}


        {/* review */}
        {activeTab === "review" && (
          <>
            <Card className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                      Code Review Assistant
                    </h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Get detailed analysis and suggestions for your code
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-700 dark:text-slate-300">Review Categories</h4>
                    <div className="space-y-1">
                      {[
                        "Code Quality Analysis",
                        "Bug Detection",
                        "Optimization Suggestions",
                        "Security Concerns",
                        "Final Verdict",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Button to trigger review */}
                <div className="mt-4 flex justify-end">
                  <Button
                    disabled={reviewLoading}
                    onClick={handlereview}
                    className="px-4 py-2 rounded-lg cursor-pointer bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    {reviewLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Review
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>


            {review && (
              <Card className="mt-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        Review Output
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Results from your code modification operation
                      </p>
                    </div>
                  </div>

                  <div className="bg-white flex justify-between dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 w-full">
                    <div className="text-sm text-slate-700 dark:text-slate-500 whitespace-pre-wrap overflow-x-auto">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            ) : (
                              <code className="bg-gray-200 rounded px-1" {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {review}
                      </ReactMarkdown>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(review)}
                      className="h-10 w-10 p-0 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-slate-500">
                      Generated at {new Date().toLocaleTimeString()}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReview("")} // fixed: should clear review, not codeExplain
                      className="cursor-pointer text-slate-500 hover:text-slate-700"
                    >
                      <X className="w-4 h-4 mr-1 cursor-pointer" />
                      Clear Output
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

          </>
        )}
        {/* explain */}
        {activeTab === "explain" &&
          (
            <>
              <Card className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">Code Explanation</h3>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        Get detailed explanations of how your code works
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Explanation Features</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-blue-500" />
                          <span>Line-by-line breakdown</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          <span>Algorithm explanation</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span>Complexity analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span>Optimization suggestions</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Button to trigger function */}
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={handleExplain}
                      disabled={explainLoading}
                      className="px-4 py-2 cursor-pointer rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition"
                    >
                      {explainLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Explain
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>


              {/* Output Panel */}
              {codeExplain && (
                <Card className="mt-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Terminal className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Explain Output</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Results from your code modification operation
                        </p>
                      </div>
                    </div>

                    <div className="bg-white flex justify-between dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 w-full">
                      <div className="text-sm text-slate-700 dark:text-slate-500 whitespace-pre-wrap overflow-x-auto">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || "");
                              return !inline && match ? (
                                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </pre>
                              ) : (
                                <code className="bg-gray-200 rounded px-1" {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {codeExplain}
                        </ReactMarkdown>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(codeExplain)}
                        className="h-10 w-10 p-0 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-slate-500">
                        Generated at {new Date().toLocaleTimeString()}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCodeExplain("")}
                        className="cursor-pointer text-slate-500 hover:text-slate-700"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear Output
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

        {/* Footer */}
        <div className="mt-12 text-center space-y-2">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Lines: {code?.split('\n')?.length}
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Characters: {code?.length}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Built with React, Monaco Editor, and modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
}




