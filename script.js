/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
// Remove generic button toggle handler so it doesn't override game buttons
// const btn = document.querySelector("button");
// if (btn) {
//   btn.onclick = function () {
//     btn.classList.toggle("dipped");
//   };
// }


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const introContainer = document.getElementById('intro-container');
    const gameContainer = document.getElementById('game-container');
    const resultsContainer = document.getElementById('results-container');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const scoreElement = document.getElementById('score');
    const currentPatternElement = document.getElementById('current-pattern');
    const patternNameElement = document.getElementById('pattern-name');
    const patternDescriptionElement = document.getElementById('pattern-description');
    const scenarioContainer = document.getElementById('scenario-container');
    const optionsContainer = document.getElementById('options-container');
    const fixOptionsSelect = document.getElementById('fix-options');
    const submitBtn = document.getElementById('submit-btn');
    const giveUpBtn = document.getElementById('give-up-btn');
    const feedbackElement = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    const finalScoreElement = document.getElementById('final-score');
    const scoreMessageElement = document.getElementById('score-message');

    // --- Game State ---
    let currentPatternIndex = 0;
    let score = 0;
    let patternIdentified = false; // Has the user clicked the correct element?
    let currentPatternData = {}; // Holds the data for the currently displayed pattern

    // --- Mobile Detection ---
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // --- Mobile-specific adjustments ---
    function applyMobileAdjustments() {
        if (isMobile) {
            // Add classes for mobile styling
            document.body.classList.add('mobile-view');
            
            // Adjust mockup sizes for mobile screens
            document.querySelectorAll('#scenario-container img').forEach(img => {
                // Ensure images are not too large on mobile
                if (img.width > 300) {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                }
            });
        }
    }

    // --- Dark Patterns Data (Placeholder - will be filled later) ---
    // Structure:
    // {
    //     id: number,
    //     name: string,
    //     description: string, // Description of the pattern type
    //     scenario: string, // Description of the specific UI shown
    //     generateMockupHTML: function() -> string, // Function returns HTML string for the mockup
    //     targetSelector: string, // CSS selector for the clickable dark pattern element WITHIN the mockup
    //     fixes: [
    //         { text: string, correct: boolean },
    //         ...
    //     ],
    //     explanation: string // Explanation of why the correct fix works / why pattern is bad
    // }
    const darkPatterns = [
        {
            id: 1,
            name: "Roach Motel",
            description: "Systems that make it easy to get in but nearly impossible to get out, with deliberately hidden or obscured account deletion processes.",
            scenario: "You want to delete your account from a subscription service.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans); overflow: hidden;">
                    <div style="padding: 15px; background: #f5f5f5; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-weight: 600; font-size: 16px;">MembersPlus Settings</div>
                        <div style="font-size: 14px; color: #555;">Premium Account</div>
                    </div>
                    
                    <div style="padding: 20px;">
                        <div style="margin-bottom: 25px;">
                            <h5 style="margin-top: 0; margin-bottom: 12px; font-size: 16px;">Account Settings</h5>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 14px; color: #444;">Personal Information</div>
                                    <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Edit</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 14px; color: #444;">Email Preferences</div>
                                    <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Manage</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 14px; color: #444;">Change Password</div>
                                    <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Update</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 14px; color: #444;">Billing Information</div>
                                    <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Manage</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                                    <div style="font-size: 14px; color: #444;">Subscription Plan</div>
                                    <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Change</button>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">
                                    <div style="font-size: 14px; color: #444;">Privacy & Security</div>
                                    <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Settings</button>
                                </div>
                            </div>
                        </div>
                        
                        <div style="border-top: 1px solid #eee; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex-grow: 1; font-size: 13px; color: #666;">Need help with your account?</div>
                            <a href="#" data-target="true" class="interactive-element" style="font-size: 13px; color: #666; text-decoration: none;">Help Center</a>
                        </div>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Add a clear 'Delete Account' option in the Account Settings menu", correct: true },
                { text: "Add more account settings options to the page", correct: false },
                { text: "Rename 'Help Center' to 'Help Center & Account Deletion'", correct: false }
            ],
            explanation: "The Roach Motel pattern deliberately makes it easy to create an account but extremely difficult to delete it. Companies hide deletion options in obscure places like help centers, require phone calls to cancel, or force users through multiple confirmation screens with manipulative messaging. This violates user autonomy and data rights. Ethical design provides a clear account deletion option in the same place as other account settings, making it as easy to leave a service as it is to join."
        },
        {
            id: 2,
            name: "Forced Continuity",
            description: "Charging users' credit cards silently after free trials without adequate notice or making cancellation unnecessarily difficult.",
            scenario: "You signed up for a free trial of a streaming service that will soon end.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="padding: 20px;">
                        <div style="text-align: center; margin-bottom: 25px;">
                            <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px; margin: 0 auto;">
                            <h4 style="margin-top: 15px; margin-bottom: 5px; font-size: 20px;">StreamMax Premium</h4>
                            <div style="font-size: 14px; color: #555;">Thank you for subscribing!</div>
                        </div>
                        
                        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
                            <div style="font-weight: 600; margin-bottom: 10px; color: #333;">Account Summary</div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <div style="font-size: 14px; color: #555;">Plan:</div>
                                <div style="font-size: 14px;">Premium Unlimited</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <div style="font-size: 14px; color: #555;">Status:</div>
                                <div style="font-size: 14px;">Free Trial</div>
                            </div>
                            <div data-target="true" class="interactive-element" style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 15px;">
                                <div style="color: #777;">Your free trial ends on May 15, 2023</div>
                                <div style="font-size: 13px; color: #777;">$14.99/month after trial</div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Payment Method</div>
                            <div style="display: flex; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 6px;">
                                <div style="width: 40px; height: 25px; margin-right: 15px; border-radius: 4px; background-color: #1A1F71; position: relative; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">VISA</div>
                                <div style="flex-grow: 1;">
                                    <div style="font-size: 14px;">•••• •••• •••• 4242</div>
                                    <div style="font-size: 13px; color: #777;">Expires 09/25</div>
                                </div>
                                <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Change</button>
                            </div>
                        </div>
                        
                        <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px; margin-bottom: 15px;">Start Watching Now</button>
                        
                        <div style="text-align: center; font-size: 13px; color: #888;">
                            By subscribing, you agree to our <a href="#" style="color: #4361ee;">Terms of Service</a>
                        </div>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Provide a clear option to cancel before the trial ends and send email reminders before charging", correct: true },
                { text: "Make the trial period longer", correct: false },
                { text: "Display the subscription cost in a larger font", correct: false }
            ],
            explanation: "Forced continuity is one of the most financially harmful dark patterns. Services often hide the auto-renewal information in small print, don't send reminders before charging begins, and make it difficult to cancel. This deliberately tricks users into unwanted subscriptions after 'free' trials. Ethical design includes clear cancellation options directly on account pages, sends reminder emails before charging begins, and makes the transition from free to paid transparent and consensual."
        },
        {
            id: 3,
            name: "Privacy Zuckering",
            description: "Tricking users into sharing more personal information than they intended to through confusing interfaces and defaults.",
            scenario: "You're setting up privacy settings for a new social media account.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="padding: 20px;">
                        <h4 style="margin-top: 0; margin-bottom: 20px; font-size: 18px;">Privacy Settings</h4>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <div style="font-weight: 500;">Profile Visibility</div>
                                <div style="position: relative;">
                                    <select style="padding: 6px 24px 6px 12px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px; appearance: none; background-color: white;">
                                        <option>Public</option>
                                        <option>Friends Only</option>
                                        <option>Private</option>
                                    </select>
                                    <div style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none;">▼</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <div style="font-weight: 500;">Contact Information</div>
                                <div style="position: relative;">
                                    <select style="padding: 6px 24px 6px 12px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px; appearance: none; background-color: white;">
                                        <option>Visible to Everyone</option>
                                        <option>Friends Only</option>
                                        <option>Hidden</option>
                                    </select>
                                    <div style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none;">▼</div>
                                </div>
                            </div>
                        </div>
                        
                        <div data-target="true" class="interactive-element" style="margin-bottom: 25px; padding: 15px; background-color: #f8f8f8; border-radius: 6px;">
                            <div style="font-weight: 500; margin-bottom: 10px;">Data Use and Analytics</div>
                            
                            <div style="margin-bottom: 15px;">
                                <label style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <input type="checkbox" checked style="margin-right: 10px; margin-top: 3px;">
                                    <div>
                                        <span style="font-size: 14px;">Enhance your experience with personalized recommendations</span>
                                        <div style="font-size: 12px; color: #777; margin-top: 3px;">We'll use your activity to recommend content, people, and ads that are relevant to you.</div>
                                    </div>
                                </label>
                                
                                <label style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                                    <input type="checkbox" checked style="margin-right: 10px; margin-top: 3px;">
                                    <div>
                                        <span style="font-size: 14px;">Help us improve our services</span>
                                        <div style="font-size: 12px; color: #777; margin-top: 3px;">We'll collect data about your activity and device to develop new features.</div>
                                    </div>
                                </label>
                                
                                <label style="display: flex; align-items: flex-start;">
                                    <input type="checkbox" checked style="margin-right: 10px; margin-top: 3px;">
                                    <div>
                                        <span style="font-size: 14px;">Share usage data with our partners</span>
                                        <div style="font-size: 12px; color: #777; margin-top: 3px;">Your data helps our partners provide better services across the web.</div>
                                    </div>
                                </label>
                            </div>
                            
                            <div style="font-size: 12px; color: #777; margin-top: 10px; text-align: center;">
                                <a href="#" style="color: #4361ee; text-decoration: none;">Manage advanced privacy settings</a>
                            </div>
                        </div>
                        
                        <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px;">Save Settings</button>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Have all data sharing options unchecked by default with clear explanations of how data will be used by the company and third parties", correct: true },
                { text: "Add more detailed explanations but keep the pre-selected checkboxes", correct: false },
                { text: "Move all data sharing options to the advanced settings page", correct: false }
            ],
            explanation: "Privacy Zuckering (named after Facebook's Mark Zuckerberg) tricks users into sharing more personal data than they intend by using pre-checked boxes, vague language, and complicated privacy controls. This deliberately exploits users' tendency to accept defaults and their inability to understand complex privacy implications. Ethical design requires true informed consent - making all data sharing opt-in rather than opt-out, using clear explanations of how data will be used, and giving users granular control over their information."
        },
        {
            id: 4,
            name: "Confirmshaming",
            description: "Guilting users into opting into something by using emotionally manipulative language that makes them feel bad for declining.",
            scenario: "You're trying to close a newsletter signup popup that appears on a shopping website.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 22px;">Email Marketing Toolkit</h3>
                        <div style="font-size: 15px; color: #666; margin-bottom: 15px;">
                            Everything you need to create professional email campaigns
                        </div>
                        <div style="font-size: 14px; background-color: #f1f8e9; color: #4CAF50; display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: 500;">
                            Special Offer: Save 50% Today!
                        </div>
                    </div>
                    
                    <div style="display: flex; margin-bottom: 25px; border: 1px solid #eee; border-radius: 6px; overflow: hidden;">
                        <div style="flex: 1.5; padding: 20px;">
                            <div style="font-weight: 600; margin-bottom: 15px; color: #333;">Your Toolkit Includes:</div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>100+ Professional Email Templates</div>
                            </div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Email Marketing Guide (PDF)</div>
                            </div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Subject Line Swipe File</div>
                            </div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Analytics Tracking Spreadsheet</div>
                            </div>
                            <div style="font-size: 14px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Video Training Series</div>
                            </div>
                        </div>
                        <div style="flex: 1; background-color: #f8f8f8; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                            <div style="text-decoration: line-through; color: #999; font-size: 16px; margin-bottom: 5px;">$99.00</div>
                            <div style="font-size: 28px; font-weight: 600; color: #333; margin-bottom: 15px;">$49.50</div>
                            <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px; background-color: #4CAF50; border: none; color: white; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">
                                Buy Now
                            </button>
                            <div style="font-size: 14px; color: #4CAF50; font-weight: 500;">
                                Limited Time Offer!
                            </div>
                        </div>
                    </div>
                    
                    <div data-target="true" class="interactive-element" style="background: white; border-radius: 8px; padding: 30px; margin-top: 20px; font-family: var(--font-sans); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #eee;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-size: 20px; font-weight: 600; margin-bottom: 5px; color: #d32f2f;">Wait! Don't leave us yet!</div>
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin: 10px auto;">
                            <div style="font-size: 15px; color: #555; margin-top: 10px;">Sarah from our team is heartbroken you're leaving...</div>
                        </div>
                        
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-size: 15px; margin-bottom: 15px;">Your items are getting lonely in your cart!</div>
                            <div style="font-size: 14px; color: #777; margin-bottom: 15px;">If you leave now, you'll disappoint yourself and miss out on these amazing products that 34 other shoppers are viewing right now.</div>
                        </div>
                        
                        <div style="display: flex; gap: 10px;">
                            <button class="mockup-button mockup-button-primary interactive-element" style="flex: 1; font-size: 14px; padding: 10px;">Return to Cart</button>
                            <button class="mockup-button mockup-button-ghost interactive-element" style="flex: 1; font-size: 14px; padding: 10px; color: #999; background: none; border: 1px solid #eee;">Abandon Sarah</button>
                        </div>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Replace guilt-inducing language with neutral messaging that simply asks if the user wants to save their cart for later", correct: true },
                { text: "Add more emotional language to make the guilt trip stronger", correct: false },
                { text: "Keep the same messaging but add a discount offer", correct: false }
            ],
            explanation: "Using emotional manipulation and guilt to prevent cart abandonment is psychologically manipulative. Phrases like 'items getting lonely' and buttons labeled 'Abandon Sarah' create unnecessary emotional pressure. Ethical design respects user autonomy and offers value (like saving a cart for later) rather than inducing guilt or shame for a perfectly normal shopping behavior."
        },
        {
            id: 5,
            name: "Disguised Ads",
            description: "Making advertisements look like navigation elements, content, or download buttons to trick users into clicking on them.",
            scenario: "You're trying to download some free software from a file hosting site.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; max-width: 650px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h3 style="margin-top: 0; margin-bottom: 10px;">Download FileZipper Pro 4.2</h3>
                        <div style="font-size: 14px; color: #666; margin-bottom: 5px;">File size: 24.3 MB · Downloads: 15,243,567</div>
                        <div style="font-size: 13px; color: #4CAF50;">Virus checked · 100% Clean</div>
                    </div>
                    
                    <div style="display: flex; gap: 20px; margin-bottom: 30px; position: relative;">
                        <div style="flex: 1;">
                            <div style="font-weight: 500; margin-bottom: 10px; font-size: 15px;">About FileZipper Pro</div>
                            <div style="font-size: 14px; color: #555; line-height: 1.5;">
                                FileZipper Pro is a powerful compression tool that allows you to create, extract, and manage archive files in multiple formats including ZIP, RAR, and 7Z.
                            </div>
                        </div>
                        
                        <div style="flex: 1; border-left: 1px solid #eee; padding-left: 20px;">
                            <div style="font-weight: 500; margin-bottom: 10px; font-size: 15px;">System Requirements</div>
                            <div style="font-size: 14px; color: #555; line-height: 1.5;">
                                Windows 7/8/10/11<br>
                                macOS 10.12 or higher<br>
                                2GB RAM minimum<br>
                                100MB free disk space
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <button class="mockup-button mockup-button-primary interactive-element" style="padding: 12px 40px; font-size: 16px; background-color: #4CAF50; border: none; color: white; border-radius: 4px; cursor: pointer;">
                            Download Now
                        </button>
                        <div style="font-size: 13px; color: #777; margin-top: 8px;">
                            Your download will begin automatically in a few seconds
                        </div>
                    </div>
                    
                    <div data-target="true" class="interactive-element" style="display: block; text-align: center; margin-top: 20px; margin-bottom: 20px; padding: 15px; border: 2px solid #4CAF50; border-radius: 6px; background-color: #f1f8e9; position: relative;">
                        <div style="position: absolute; top: 5px; right: 10px; font-size: 10px; color: #999;">Ad</div>
                        <div style="font-weight: 600; font-size: 18px; color: #333; margin-bottom: 5px;">DOWNLOAD NOW</div>
                        <div style="font-size: 13px; color: #666; margin-bottom: 10px;">High-speed download · No waiting</div>
                        <button style="padding: 10px 30px; font-size: 16px; background-color: #4CAF50; border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: 600;">
                            FAST DOWNLOAD
                        </button>
                    </div>
                    
                    <div style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
                        By downloading, you agree to our <a href="#" style="color: #4361ee;">Terms of Service</a> and <a href="#" style="color: #4361ee;">Privacy Policy</a>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Clearly label all advertisements with prominent 'Advertisement' markers and visually separate them from actual download buttons", correct: true },
                { text: "Remove all advertisements from the download page", correct: false },
                { text: "Make the real download button larger and more colorful", correct: false }
            ],
            explanation: "Disguised ads are deceptive elements designed to look like content, navigation, or functional buttons when they're actually advertisements. The tiny 'Ad' label is intentionally obscured while the styling mimics legitimate download buttons. This pattern is particularly harmful as it can lead users to install unwanted software or malware. Ethical design clearly distinguishes advertisements from functional elements with prominent labeling and visual differentiation, respecting users' ability to make informed choices."
        },
        {
            id: 6,
            name: "Bait and Switch",
            description: "Advertising one thing but delivering something significantly different after the user has committed.",
            scenario: "You clicked on a 'Get a free report' button and landed on this page.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <div style="font-size: 24px; font-weight: 600; margin-bottom: 10px; color: #333;">Your Free Investment Report</div>
                        <div style="font-size: 16px; color: #666; margin-bottom: 15px;">
                            Discover the top stocks for 2023
                        </div>
                        <img src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc" style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px; margin: 0 auto;">
                    </div>
                    
                    <div style="margin-bottom: 25px; padding: 20px; background-color: #f8f8f8; border-radius: 6px;">
                        <div style="font-weight: 600; margin-bottom: 15px; color: #333;">What You'll Get:</div>
                        <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                            <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                            <div style="font-size: 14px;">Exclusive market insights from top analysts</div>
                        </div>
                        <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                            <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                            <div style="font-size: 14px;">5 stock recommendations with detailed analysis</div>
                        </div>
                        <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                            <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                            <div style="font-size: 14px;">Industry trends and forecasts for the next 12 months</div>
                        </div>
                    </div>
                    
                    <div data-target="true" class="interactive-element" style="margin-bottom: 25px; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="font-weight: 500; margin-bottom: 10px;">Complete Your Access</div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-size: 14px; margin-bottom: 5px;">Full Name</label>
                            <input type="text" placeholder="Enter your name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-size: 14px; margin-bottom: 5px;">Email Address</label>
                            <input type="email" placeholder="Enter your email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-size: 14px; margin-bottom: 5px;">Phone Number</label>
                            <input type="tel" placeholder="Enter your phone number" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; font-size: 14px; margin-bottom: 5px;">Credit Card Information</label>
                            <input type="text" placeholder="Card number" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; margin-bottom: 10px;">
                            <div style="display: flex; gap: 10px;">
                                <input type="text" placeholder="MM/YY" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                                <input type="text" placeholder="CVC" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                            </div>
                        </div>
                        
                        <div style="font-size: 12px; color: #777; margin-bottom: 15px;">
                            Your card will be charged $1 for verification. After your 7-day free trial, you'll be automatically enrolled in our Premium Investing Newsletter for $49.99/month unless you cancel.
                        </div>
                        
                        <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px; background-color: #4CAF50; border: none; color: white; border-radius: 4px; cursor: pointer;">
                            Get Your Free Report Now
                        </button>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Clearly disclose the subscription terms at the same visual prominence as the initial price and require explicit opt-in for the subscription", correct: true },
                { text: "Increase the font size of the subscription disclosure text", correct: false },
                { text: "Add a confirmation popup after clicking 'Buy Now'", correct: false }
            ],
            explanation: "Bait and Switch is a classic deceptive pattern where users are lured in with one promise (a free report) only to discover they must provide credit card information and enroll in an expensive subscription. The 'free' claim is technically true but deliberately misleading, as the real goal is to capture payment details and convert users to paid subscriptions. This practice violates consumer trust and often borders on illegal. Ethical design is transparent about requirements upfront, making the true nature of any transaction clear before users invest time or information."
        },
        {
            id: 7,
            name: "Friend Spam",
            description: "Tricking users into sharing contact lists or posting to friends' feeds by requesting permissions under false pretenses.",
            scenario: "You're using a new photo sharing app that asks for access to your contacts.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; max-width: 400px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="background-color: #9C27B0; color: white; padding: 20px; text-align: center;">
                        <div style="font-weight: 600; font-size: 20px; margin-bottom: 5px;">SnapShare</div>
                        <div style="font-size: 14px; opacity: 0.9;">Find friends and share moments</div>
                    </div>
                    
                    <div style="padding: 25px;">
                        <div style="text-align: center; margin-bottom: 25px;">
                            <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; margin: 0 auto 15px auto;">
                            <div style="font-weight: 600; font-size: 18px; margin-bottom: 5px;">Welcome, Alex!</div>
                            <div style="font-size: 14px; color: #666;">Your profile is almost complete</div>
                        </div>
                        
                        <div data-target="true" class="interactive-element" style="margin-bottom: 25px; padding: 20px; background-color: #f3e5f5; border-radius: 6px; text-align: center;">
                            <div style="font-weight: 500; margin-bottom: 15px; font-size: 16px;">Find friends on SnapShare</div>
                            <div style="font-size: 14px; color: #555; margin-bottom: 20px; line-height: 1.5;">
                                Connect with friends to see their photos and share your moments! We'll help you find people you know.
                            </div>
                            <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px; background-color: #9C27B0; border: none; color: white; border-radius: 4px; cursor: pointer; margin-bottom: 12px;">
                                Find Friends
                            </button>
                            <div style="font-size: 12px; color: #777;">
                                By tapping "Find Friends", your contacts will be uploaded to help connect you with friends. We may send them notifications.
                            </div>
                        </div>
                        
                        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
                            <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 14px; padding: 10px 20px; background: none; border: 1px solid #ddd; color: #666; border-radius: 4px; cursor: pointer;">
                                Skip for now
                            </button>
                        </div>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Clearly explain what happens when contacts are uploaded, that messages will be sent to contacts, and make the Skip option equally prominent", correct: true },
                { text: "Remove contact uploading completely", correct: false },
                { text: "Make the Skip button more visible but keep the same contact upload flow", correct: false }
            ],
            explanation: "Friend spam tricks users into granting access to contact lists under the guise of 'finding friends' when the real intention is to send promotional messages to those contacts. The app doesn't clearly disclose that it will message your contacts, potentially damaging your relationships when friends receive unwanted invitations that appear to come from you. Ethical design is transparent about exactly how contact information will be used, obtains genuine informed consent before accessing contacts, and never sends messages that appear to come from users without their explicit permission for each message."
        },
        {
            id: 8,
            name: "Data Hostage",
            description: "Making it extremely difficult or impossible for users to export their data, effectively locking them into a service.",
            scenario: "You want to download your data to switch to a different service.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="padding: 20px;">
                        <h3 style="margin-top: 0; margin-bottom: 20px; font-size: 18px;">Account Settings</h3>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <div style="font-weight: 500;">Profile Information</div>
                                <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Edit</button>
                            </div>
                            <div style="font-size: 14px; color: #555; border-top: 1px solid #eee; padding-top: 10px;">
                                <div style="margin-bottom: 5px;"><strong>Name:</strong> Jamie Smith</div>
                                <div style="margin-bottom: 5px;"><strong>Email:</strong> jamie.smith@example.com</div>
                                <div><strong>Member since:</strong> March 2020</div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <div style="font-weight: 500;">Password & Security</div>
                                <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Manage</button>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <div style="font-weight: 500;">Billing Information</div>
                                <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">View</button>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <div style="font-weight: 500;">Email Preferences</div>
                                <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Update</button>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <div style="font-weight: 500;">Storage & Data</div>
                                <button class="mockup-button mockup-button-secondary interactive-element" style="font-size: 13px; padding: 6px 12px;">Manage</button>
                            </div>
                            <div style="font-size: 14px; color: #555; border-top: 1px solid #eee; padding-top: 10px;">
                                <div style="margin-bottom: 5px;">You're using 8.4 GB of your 10 GB storage.</div>
                                <div style="height: 6px; background-color: #eee; border-radius: 3px; margin: 10px 0;">
                                    <div style="height: 100%; width: 84%; background-color: #2196F3; border-radius: 3px;"></div>
                                </div>
                                <div style="font-size: 13px; color: #777; display: flex; justify-content: flex-end; margin-top: 5px;">
                                    <a href="#" style="color: #2196F3; text-decoration: none; font-size: 13px;">Upgrade storage</a>
                                </div>
                            </div>
                        </div>
                        
                        <div data-target="true" class="interactive-element" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                            <div style="font-size: 13px; color: #999; margin-bottom: 10px;">Looking for something else?</div>
                            <div style="font-size: 13px; color: #999;">
                                <a href="#" style="color: #2196F3; text-decoration: none; margin: 0 10px;">Support Center</a>
                                <a href="#" style="color: #2196F3; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                                <a href="#" style="color: #2196F3; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Add a prominent 'Export Your Data' option in the Storage & Data section", correct: true },
                { text: "Add a data export link in the footer links", correct: false },
                { text: "Add data export information to the Support Center", correct: false }
            ],
            explanation: "Data hostage is a dark pattern where services intentionally make it difficult or impossible to export your own data, effectively locking you in. This deliberate friction prevents users from moving to competing services and violates data portability principles. The service hides export functionality or omits it entirely. Ethical design provides clear, accessible data export options - typically in the same section where data usage and storage are discussed - empowering users to control their own information and switch services if desired."
        },
        {
            id: 9,
            name: "Deceptive Hierarchy",
            description: "Using visual weight, color, and positioning to make harmful options appear beneficial while making beneficial options seem harmful.",
            scenario: "You're choosing privacy settings for a smart home device app.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; max-width: 500px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="padding: 20px;">
                        <h3 style="margin-top: 0; margin-bottom: 5px; font-size: 18px;">Privacy Settings</h3>
                        <div style="font-size: 14px; color: #666; margin-bottom: 20px;">Choose how your SmartHome data is used</div>
                        
                        <div data-target="true" class="interactive-element" style="margin-bottom: 25px;">
                            <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                                <button style="flex: 1; padding: 15px; background-color: #4CAF50; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: 500; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); cursor: pointer;">
                                    Basic
                                </button>
                                <button style="flex: 1; padding: 15px; background-color: #f5f5f5; color: #999; border: 1px solid #ddd; border-radius: 6px; font-size: 15px; font-weight: 500; text-align: center; cursor: pointer;">
                                    Limited
                                </button>
                                <button style="flex: 1; padding: 15px; background-color: #f5f5f5; color: #999; border: 1px solid #ddd; border-radius: 6px; font-size: 15px; font-weight: 500; text-align: center; cursor: pointer;">
                                    Restricted
                                </button>
                            </div>
                            
                            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 6px;">
                                <div style="font-weight: 500; margin-bottom: 15px; color: #4CAF50;">Basic (Recommended)</div>
                                <div style="font-size: 14px; color: #555; margin-bottom: 15px; line-height: 1.5;">
                                    Full access to all SmartHome features. We'll collect data about your device usage, voice recordings, and home activity to improve our services and provide personalized recommendations.
                                </div>
                                <div style="font-size: 14px; margin-bottom: 5px; display: flex; align-items: center;">
                                    <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                    <div>Full access to all smart features</div>
                                </div>
                                <div style="font-size: 14px; margin-bottom: 5px; display: flex; align-items: center;">
                                    <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                    <div>Voice control and automation</div>
                                </div>
                                <div style="font-size: 14px; margin-bottom: 5px; display: flex; align-items: center;">
                                    <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                    <div>Personalized recommendations</div>
                                </div>
                                <div style="font-size: 14px; margin-bottom: 5px; display: flex; align-items: center;">
                                    <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                    <div>Data sharing with our partners</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="font-size: 12px; color: #999; margin-bottom: 20px; line-height: 1.5;">
                            Note: Choosing "Limited" or "Restricted" privacy settings may reduce functionality and disable certain features of your SmartHome device.
                        </div>
                        
                        <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px; background-color: #4CAF50; border: none; color: white; border-radius: 4px; cursor: pointer;">
                            Save Settings
                        </button>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Present all privacy options with equal visual weight and clearly explain the data collection implications of each", correct: true },
                { text: "Keep the same visual hierarchy but add more detailed explanations", correct: false },
                { text: "Pre-select the 'Restricted' option instead", correct: false }
            ],
            explanation: "Deceptive hierarchy uses visual design elements like color, size, and positioning to manipulate users into selecting options that benefit the company rather than protecting user privacy. The 'Basic' option (which collects the most data) is made to look like the best choice through prominent coloring, positive framing, and being marked as 'recommended' while privacy-protective options are visually diminished. This deliberately exploits cognitive biases toward selecting visually emphasized options. Ethical design presents choices with equal visual weight and uses clear, neutral language to help users make informed decisions aligned with their actual preferences."
        },
        {
            id: 10,
            name: "Hidden Subscription Trap",
            description: "Disguising recurring subscriptions as one-time purchases with critical terms buried in fine print.",
            scenario: "You're purchasing what appears to be a one-time digital service.",
            generateMockupHTML: () => `
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; max-width: 550px; margin: auto; background: white; font-family: var(--font-sans);">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 22px;">Email Marketing Toolkit</h3>
                        <div style="font-size: 15px; color: #666; margin-bottom: 15px;">
                            Everything you need to create professional email campaigns
                        </div>
                        <div style="font-size: 14px; background-color: #f1f8e9; color: #4CAF50; display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: 500;">
                            Special Offer: Save 50% Today!
                        </div>
                    </div>
                    
                    <div style="display: flex; margin-bottom: 25px; border: 1px solid #eee; border-radius: 6px; overflow: hidden;">
                        <div style="flex: 1.5; padding: 20px;">
                            <div style="font-weight: 600; margin-bottom: 15px; color: #333;">Your Toolkit Includes:</div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>100+ Professional Email Templates</div>
                            </div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Email Marketing Guide (PDF)</div>
                            </div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Subject Line Swipe File</div>
                            </div>
                            <div style="font-size: 14px; margin-bottom: 8px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Analytics Tracking Spreadsheet</div>
                            </div>
                            <div style="font-size: 14px; display: flex; align-items: center;">
                                <div style="color: #4CAF50; margin-right: 10px;">✓</div>
                                <div>Video Training Series</div>
                            </div>
                        </div>
                        <div style="flex: 1; background-color: #f8f8f8; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                            <div style="text-decoration: line-through; color: #999; font-size: 16px; margin-bottom: 5px;">$99.00</div>
                            <div style="font-size: 28px; font-weight: 600; color: #333; margin-bottom: 15px;">$49.50</div>
                            <button class="mockup-button mockup-button-primary interactive-element" style="width: 100%; font-size: 15px; padding: 12px; background-color: #4CAF50; border: none; color: white; border-radius: 4px; cursor: pointer; margin-bottom: 10px;">
                                Buy Now
                            </button>
                            <div style="font-size: 14px; color: #4CAF50; font-weight: 500;">
                                Limited Time Offer!
                            </div>
                        </div>
                    </div>
                    
                    <div data-target="true" class="interactive-element" style="font-size: 10px; color: #999; line-height: 1.4; text-align: center; margin-bottom: 20px;">
                        By clicking "Buy Now", you agree to purchase the Email Marketing Toolkit for $49.50 today and enroll in our Marketing Resources Membership. After your initial purchase, you'll be automatically billed $29.99 monthly until cancelled. You can cancel anytime by contacting customer support at support@emailtoolkit.com.
                    </div>
                    
                    <div style="border-top: 1px solid #eee; padding-top: 20px; display: flex; justify-content: space-between; font-size: 13px; color: #666;">
                        <div>Secure payment</div>
                        <div>100% satisfaction guarantee</div>
                        <div>24/7 customer support</div>
                    </div>
                </div>
            `,
            targetSelector: '[data-target="true"]',
            fixes: [
                { text: "Clearly disclose the subscription terms at the same visual prominence as the initial price and require explicit opt-in for the subscription", correct: true },
                { text: "Increase the font size of the subscription disclosure text", correct: false },
                { text: "Add a confirmation popup after clicking 'Buy Now'", correct: false }
            ],
            explanation: "Hidden subscription traps deliberately disguise recurring charges as one-time purchases, burying the subscription disclosure in tiny fine print that many users won't notice. This pattern intentionally exploits users' expectations of making a single purchase while enrolling them in ongoing charges that can be difficult to cancel. The visual design draws attention to the discounted price while minimizing the subscription terms. Ethical design requires transparent, prominent disclosure of subscription terms at the same visual prominence as the price information, and obtaining explicit consent for recurring charges rather than burying them in fine print."
        }
    ];


    // --- Game Logic Functions ---

    function initGame() {
        console.log("Initializing game...");
        currentPatternIndex = 0;
        score = 0;
        patternIdentified = false;

        updateScoreDisplay();

        introContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
        gameContainer.style.display = 'block';

        loadPattern(currentPatternIndex);
    }

    function loadPattern(index) {
        if (index >= darkPatterns.length) {
            showResults();
            return;
        }
        console.log(`Loading pattern ${index + 1}`);
        currentPatternData = darkPatterns[index];
        patternIdentified = false; // Reset for the new pattern

        // Update UI text
        patternNameElement.textContent = currentPatternData.name;
        patternDescriptionElement.textContent = currentPatternData.scenario; // Use scenario description here
        currentPatternElement.textContent = (index + 1).toString();

        // Generate and inject mockup HTML
        scenarioContainer.innerHTML = currentPatternData.generateMockupHTML();

        // Apply mobile adjustments
        applyMobileAdjustments();

        // Add event listener for clicking within the scenario
        // Use event delegation on the container
        scenarioContainer.removeEventListener('click', handleScenarioClick); // Remove old listener first
        scenarioContainer.addEventListener('click', handleScenarioClick);

        // Shuffle the fixes array while preserving which one is correct
        const shuffledFixes = shuffleAnswers([...currentPatternData.fixes]);
        
        // Populate fix options
        fixOptionsSelect.innerHTML = '<option value="" disabled selected>Choose the best solution...</option>';
        shuffledFixes.forEach((fix, i) => {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = fix.text;
            option.dataset.correct = fix.correct; // Store correctness
            fixOptionsSelect.appendChild(option);
        });

        // Reset UI states
        optionsContainer.style.display = 'none'; // Hide options initially
        feedbackElement.style.display = 'none';
        feedbackElement.className = 'feedback'; // Reset feedback class
        nextBtn.style.display = 'none';
        submitBtn.disabled = false;
        giveUpBtn.disabled = false;
        fixOptionsSelect.disabled = false;
        fixOptionsSelect.value = ""; // Reset dropdown selection
        // Remove any previous highlights
        scenarioContainer.querySelectorAll('.correctly-identified').forEach(el => el.classList.remove('correctly-identified'));
    }

    // Helper function to shuffle answer options
    function shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }

    function handleScenarioClick(event) {
        if (patternIdentified) return; // Don't register clicks after identification

        // Prevent default behavior to stop unwanted scrolling
        event.preventDefault();
        event.stopPropagation();

        // Get the exact element that was clicked
        const clickedElement = event.target;
        
        // Check if the clicked element or any of its parents matches the target selector
        const potentialTarget = clickedElement.closest(currentPatternData.targetSelector);
        
        console.log("Scenario clicked", {
            clickedElement,
            potentialTarget,
            targetSelector: currentPatternData.targetSelector
        });

        if (potentialTarget) {
            console.log("Correct element clicked!");
            patternIdentified = true;
            score++;
            updateScoreDisplay();

            // Add visual feedback only to the specific element
            potentialTarget.classList.add('correctly-identified');

            // Show the fix options without scrolling
            optionsContainer.style.display = 'block';
            
            // For mobile, add a small delay to ensure the visual feedback is seen
            if (isMobile) {
                setTimeout(() => {
                    optionsContainer.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                }, 300);
            }
        } else {
            console.log("Incorrect element clicked.");
            // Add subtle feedback for wrong click
            clickedElement.classList.add('shake');
            setTimeout(() => clickedElement.classList.remove('shake'), 300);
        }
    }


    function handleSubmitFix() {
        if (!patternIdentified) {
            showFeedback("Hold up! You need to click on the sneaky dark pattern first. 👆", 'incorrect');
            return;
        }
        const selectedIndex = fixOptionsSelect.value;
        if (selectedIndex === "") {
            showFeedback("Oops! Don't forget to pick a solution from the dropdown. 👇", 'incorrect');
            return;
        }

        const selectedOption = fixOptionsSelect.options[parseInt(selectedIndex) + 1]; // +1 for the default option
        let feedbackText = "";
        let feedbackType = 'incorrect'; // Default to incorrect

        if (selectedOption.dataset.correct === 'true') {
            score++;
            updateScoreDisplay();
            feedbackText = `<strong>Nailed it! 🎯</strong> ${currentPatternData.explanation}`;
            feedbackType = 'correct';
        } else {
            // Find the correct answer
            const correctFixText = Array.from(fixOptionsSelect.options)
                .find(opt => opt.dataset.correct === 'true')?.textContent || "the intended solution";
            feedbackText = `<strong>Not quite there... 🤔</strong> The best approach would be: "${correctFixText}" <br><br><strong>Why it matters:</strong> ${currentPatternData.explanation}`;
        }

        showFeedback(feedbackText, feedbackType);
        finalizeRound();
    }

    function handleGiveUp() {
        feedbackElement.className = 'feedback'; // Reset class before potentially adding incorrect
        let feedbackText = `<strong>mystery solved! 🔍</strong> the dark pattern is now highlighted above. <br><br> the best fix would be: "${currentPatternData.fixes.find(f => f.correct)?.text || 'N/A'}". <br><br><strong>why it matters:</strong> ${currentPatternData.explanation}`;

        // Highlight the correct element if not already done
        if (!patternIdentified) {
            const targetElement = scenarioContainer.querySelector(currentPatternData.targetSelector);
            if (targetElement) {
                targetElement.classList.add('correctly-identified');
            }
        }
        showFeedback(feedbackText, 'incorrect'); // Show as incorrect since they gave up
        finalizeRound();
    }

    function finalizeRound() {
        // Disable further interaction for this round
        submitBtn.disabled = true;
        giveUpBtn.disabled = true;
        fixOptionsSelect.disabled = true;
        patternIdentified = true; // Ensure no more scenario clicks register

        // Show the "Next" button
        nextBtn.style.display = 'inline-flex'; // Use inline-flex like other buttons
        nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function moveToNextPattern() {
        currentPatternIndex++;
        loadPattern(currentPatternIndex);
    }

    function showFeedback(message, type) {
        feedbackElement.innerHTML = message;
        feedbackElement.className = `feedback ${type}`; // Apply type class ('correct' or 'incorrect')
        feedbackElement.style.display = 'block';
    }

     function updateScoreDisplay() {
        scoreElement.textContent = score.toString();
    }


    function showResults() {
        console.log("Showing results");
        gameContainer.style.display = 'none';
        resultsContainer.style.display = 'block';

        finalScoreElement.textContent = score.toString();

        let message = `you spotted ${score} out of ${darkPatterns.length * 2} possible points.`; // Simple message for now

        if (score >= 18) {
            message += " wow, you're a dark pattern detective extraordinaire! 🏆 your users will thank you for creating honest, transparent experiences that respect their choices!";
        } else if (score >= 14) {
            message += " impressive detective work! 🕵️‍♀️ you've got a sharp eye for spotting those sneaky design tricks. your future products will be better for it!";
        } else if (score >= 10) {
            message += " good investigating! you're well on your way to mastering the art of ethical design. keep those user-friendly instincts sharp!";
        } else {
            message += " thanks for playing! dark patterns can be tricky to spot - but now you know what to look for. ready for another round to level up your skills?";
        }
        scoreMessageElement.textContent = message;
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

    }

    // --- Event Listeners ---
    startBtn.addEventListener('click', () => {
        console.log('Start button clicked');
        initGame();
    });
    
    restartBtn.addEventListener('click', initGame);
    submitBtn.addEventListener('click', handleSubmitFix);
    giveUpBtn.addEventListener('click', handleGiveUp);
    nextBtn.addEventListener('click', moveToNextPattern);
    
    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleResize);
    
    // Add mobile touch enhancements
    if ('ontouchstart' in window) {
        // Use touchstart for faster response on mobile
        document.querySelectorAll('.button, .mockup-button').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            btn.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
        });
    }

    // --- Initial Setup ---
    // Apply mobile adjustments on initial load
    if (isMobile) {
        document.body.classList.add('mobile-view');
        applyMobileAdjustments();
    }
    
    // Show intro by default
    gameContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    introContainer.style.display = 'block';

    // Add a function to handle the resize event for responsive behavior
    function handleResize() {
        const wasMobile = document.body.classList.contains('mobile-view');
        const isNowMobile = window.matchMedia("(max-width: 768px)").matches;
        
        if (wasMobile !== isNowMobile) {
            // Device state changed, reload the current pattern
            document.body.classList.toggle('mobile-view');
            if (gameContainer.style.display !== 'none') {
                loadPattern(currentPatternIndex);
            }
        }
    }
});

