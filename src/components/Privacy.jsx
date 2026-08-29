// src/pages/Privacy.jsx

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-white/40 mb-10">Last updated: August 2026</p>

      <div className="space-y-8 text-sm text-white/70 leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-white mb-2">1. What We Collect</h2>
          <p>When you create a TalentLink account, we collect:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Basic profile info: name, age, gender, photo URL, about section</li>
            <li>Professional info: skills, domains, experience, role, organization</li>
            <li>Account credentials (stored securely, passwords are hashed)</li>
            <li>Connection activity: requests you send, accept, or ignore</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">2. How We Use It</h2>
          <p>Your information is used only to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Show your profile to other users in the feed</li>
            <li>Calculate match scores based on shared skills/domains</li>
            <li>Enable connection requests between users</li>
            <li>Keep your account secure (authentication)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">3. What We Don't Do</h2>
          <p>
            TalentLink does not sell your data, share it with third parties for
            advertising, or use it for anything beyond making the platform work.
            This is an academic project, not a data-driven business.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">4. Cookies & Sessions</h2>
          <p>
            TalentLink uses cookies to keep you logged in (JWT-based authentication).
            No third-party tracking or advertising cookies are used.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">5. Data Storage</h2>
          <p>
            Your data is stored in a MongoDB database associated with this project.
            Reasonable security practices (password hashing, authenticated routes) are
            used, but as a student project, TalentLink should not be used to store
            sensitive personal information.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">6. Your Choices</h2>
          <p>
            You can edit or remove your profile information at any time from the Edit
            Profile page. For full account deletion requests, contact us directly.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">7. Contact</h2>
          <p>
            Questions about this policy? Reach out at{" "}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=itsanuragrao@gmail.com&su=Question%20about%20Privacy%20Policy"
             target="_blank"
             rel="noopener noreferrer"
             className="text-indigo-400 hover:underline">
              itsanuragrao@gmail.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Privacy;