import type { NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { VibeType } from '../components/DropDown';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingDots from '../components/LoadingDots';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    temperature: '',
    workload: '',
    flavor: '',
    fan: '',
    returnTime: ''
  });
  const [vibe, setVibe] = useState<VibeType>('Professional');
  const [generatedDrinks, setGeneratedDrinks] = useState<String>('');

  const preferencesRef = useRef<null | HTMLDivElement>(null);

  const scrollToDrinks = () => {
    if (preferencesRef.current !== null) {
      preferencesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prompt = `Generate 3 ${vibe === 'Casual' ? 'relaxed' : vibe === 'Funny' ? 'silly' : 'Professional'
    } Starbucks drink recommendations based on these preferences: 
    1. Drink type: ${preferences.temperature}. 
    2. Workload: ${preferences.workload}. 
    3. Preferred flavor: ${preferences.flavor}. 
    4. Starbucks fan: ${preferences.fan}. 
    5. Return time: ${preferences.returnTime}. 
    Make the recommendations less than 300 characters, and clearly labeled "1.", "2.", and "3.".`;

  const generateDrink = async (e: any) => {
    e.preventDefault();
    setGeneratedDrinks('');
    setLoading(true);
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const onParseGPT = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === 'event') {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? '';
          setGeneratedDrinks((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParseGPT);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToDrinks();
    setLoading(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-400">
      <Head>
        <title>Starbucks Drink Decider</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center px-8 sm:px-20 py-12 sm:py-20">

        <div className="flex flex-col items-center w-full max-w-5xl sm:flex-row">
          {/* Left Side */}
          <div className="flex flex-col items-center sm:items-start sm:w-1/2">
            <h1 className="text-4xl sm:text-6xl font-bold font-mono text-slate-900 text-center sm:text-left">
              Are you unsure about what to get at Starbucks? 
            </h1>
            <div className='py-10 flex flex-col items-center sm:items-start'>
              <p className="border rounded-xl py-1 px-6 text-black-900 text-m font-mono mb-5 hover:scale-105 transition duration-300 ease-in-out inline-block">
                Helped more than <b>100</b> Starbucks customers choose their next drinks
              </p>
              <img
                alt="Starbucks Coffee"
                src="/favicon.png"
                className="w-64 h-64 sm:w-80 sm:h-80"
              />
            </div>
          </div>

          <div className="w-px h-full bg-gray-300 mx-5"></div>

          {/* Right Side */}
          <div className="flex flex-col items-center justify-center w-full sm:w-1/2 mt-10 sm:mt-0">
            <div className="w-full max-w-xl">

              <div className="mt-10">
                <p className="text-left text-xl font-mono">
                  <b>Question 1:</b> Do you prefer coffee hot, iced, Frappuccino, or food?
                </p>
                <textarea
                  name="temperature"
                  value={preferences.temperature}
                  onChange={handleChange}
                  rows={1}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                  placeholder={'e.g. I only want food'}
                />
              </div>

              <div>
                <p className="text-left text-xl font-mono">
                  <b>Question 2:</b> Do you have a lot of work to do or are you just vibing?
                </p>
                <textarea
                  name="workload"
                  value={preferences.workload}
                  onChange={handleChange}
                  rows={1}
                  className="w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                  placeholder={'e.g. just vibing with my friends'}
                />
              </div>

              <div>
                <p className="text-left text-xl font-mono">
                  <b>Question 3:</b> Which flavor do you like the most based on your previous orders?
                </p>
                <textarea
                  name="flavor"
                  value={preferences.flavor}
                  onChange={handleChange}
                  rows={1}
                  className="w-full rounded-md font-mono border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                  placeholder={'e.g. mocha or vanilla'}
                />
              </div>

              <div>
                <p className="text-left text-xl font-mono">
                  <b>Question 4:</b> Are you a Starbucks fan?
                </p>
                <textarea
                  name="fan"
                  value={preferences.fan}
                  onChange={handleChange}
                  rows={1}
                  className="w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                  placeholder={'e.g. Yes, No, Not Yet'}
                />
              </div>

              <div>
                <p className="text-left text-xl font-mono">
                  <b>Question 5:</b> When do you assume that you will come back to Starbucks? Tomorrow? Next Week?
                </p>
                <textarea
                  name="returnTime"
                  value={preferences.returnTime}
                  onChange={handleChange}
                  rows={1}
                  className="w-full rounded-md font-mono border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                  placeholder={'e.g. Tomorrow, Next Week, Next Month'}
                />
              </div>

              <div className="flex mb-5 text-xl font-mono items-center space-x-3">
                <p className="text-left font-mono font-bold">What's your Starbucks Vibe?</p>
              </div>
              <div className="block">
                <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
              </div>

              {!loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium text-xl font-mono px-4 py-2 mt-8 hover:bg-black/80 w-full"
                  onClick={(e) => generateDrink(e)}
                >
                  Let me decide for you &rarr;
                </button>
              )}
              {loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 w-full"
                  disabled
                >
                  <LoadingDots color="white" style="large" />
                </button>
              )}
            </div>

            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700 w-full my-8" />

            <div className="space-y-10 my-10 w-full">
              {generatedDrinks && (
                <>
                  <div>
                    <h2
                      className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto text-center font-mono"
                      ref={preferencesRef}
                    >
                      Your drink recommendations are here!
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto font-mono">
                    {generatedDrinks
                      .substring(generatedDrinks.indexOf('1') + 3)
                      .split(/2\.|3\./)
                      .map((generatedDrink) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedDrink);
                              toast('Drink recommendation copied to clipboard', {
                                icon: '☕',
                              });
                            }}
                            key={generatedDrink}
                          >
                            <p>{generatedDrink}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
