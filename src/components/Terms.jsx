// src/pages/Terms.jsx

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-white/40 mb-10">Last updated: August 2026</p>

      <div className="space-y-8 text-sm text-white/70 leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-white mb-2">1. About TalentLink</h2>
          <p>
            TalentLink is a student-built project created to help developers, students,
            and professionals connect based on shared skills and domains. It is a
            portfolio/academic project and not a commercial product.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">2. Your Account</h2>
          <p>
            You're responsible for the accuracy of the information you add to your
            profile, and for keeping your login credentials secure. Please don't
            impersonate someone else or create an account for anyone but yourself.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">3. Acceptable Use</h2>
          <p>You agree not to use TalentLink to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Post false, misleading, or harmful information</li>
            <li>Harass, spam, or abuse other users</li>
            <li>Attempt to access accounts or data that aren't yours</li>
            <li>Use the platform for any unlawful purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">4. Content</h2>
          <p>
            You retain ownership of the information you submit (profile details, about
            section, skills, etc.). By posting it, you allow TalentLink to display it to
            other users as part of the normal functioning of the app.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">5. No Warranty</h2>
          <p>
            TalentLink is provided "as is" as part of an academic project. It's not
            guaranteed to be error-free, always available, or fit for any particular
            purpose.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">6. Changes</h2>
          <p>
            These terms may be updated as the project evolves. Continued use of
            TalentLink after changes means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-2">7. Contact</h2>
          <p>
            Questions about these terms? Reach out at{" "}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=itsanuragrao@gmail.com&su=Question%20about%20Terms%20of%20Service"
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

export default Terms;