-- Create updated lessons table structure for curriculum content
CREATE TABLE IF NOT EXISTS public.curriculum_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  unit_number INTEGER NOT NULL,
  unit_title TEXT NOT NULL,
  lesson_title TEXT NOT NULL,
  lesson_description TEXT,
  content JSONB,
  lesson_type TEXT DEFAULT 'theory', -- theory, mcq, practical
  xp_reward INTEGER DEFAULT 50,
  order_sequence INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create questions table for lesson quizzes
CREATE TABLE IF NOT EXISTS public.lesson_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES public.curriculum_lessons(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'mcq', -- mcq, true_false, short_answer
  choices JSONB, -- for mcq questions
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  marks INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create student lesson progress table
CREATE TABLE IF NOT EXISTS public.student_lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  lesson_id UUID REFERENCES public.curriculum_lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  is_unlocked BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, lesson_id)
);

-- Enable RLS on all tables
ALTER TABLE public.curriculum_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for curriculum_lessons
CREATE POLICY "Everyone can view lessons" 
ON public.curriculum_lessons 
FOR SELECT 
USING (true);

CREATE POLICY "Teachers can manage lessons" 
ON public.curriculum_lessons 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.users u 
  WHERE u.id = auth.uid() AND u.role = 'teacher'
));

-- RLS Policies for lesson_questions
CREATE POLICY "Everyone can view questions" 
ON public.lesson_questions 
FOR SELECT 
USING (true);

CREATE POLICY "Teachers can manage questions" 
ON public.lesson_questions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.users u 
  WHERE u.id = auth.uid() AND u.role = 'teacher'
));

-- RLS Policies for student_lesson_progress
CREATE POLICY "Students can view own progress" 
ON public.student_lesson_progress 
FOR SELECT 
USING (student_id = auth.uid());

CREATE POLICY "Students can update own progress" 
ON public.student_lesson_progress 
FOR INSERT 
WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can modify own progress" 
ON public.student_lesson_progress 
FOR UPDATE 
USING (student_id = auth.uid());

CREATE POLICY "Teachers can view student progress" 
ON public.student_lesson_progress 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.users u 
  WHERE u.id = auth.uid() AND u.role = 'teacher'
));

-- Insert sample lessons based on the PDF content
INSERT INTO public.curriculum_lessons (subject, grade, unit_number, unit_title, lesson_title, lesson_description, lesson_type, xp_reward, order_sequence) VALUES

-- Physics lessons
('Physics', 11, 1, 'Physical World and Measurement', 'Physics and its Scope', 'Introduction to physics, technology and society', 'theory', 50, 1),
('Physics', 11, 1, 'Physical World and Measurement', 'Units and Measurement', 'Fundamental and derived units, SI units, errors in measurement', 'theory', 60, 2),
('Physics', 11, 1, 'Physical World and Measurement', 'Dimensional Analysis', 'Dimensions of physical quantities and their applications', 'mcq', 70, 3),

('Physics', 11, 2, 'Kinematics', 'Motion in a Straight Line', 'Rest and motion, frame of reference, velocity and acceleration', 'theory', 60, 4),
('Physics', 11, 2, 'Kinematics', 'Motion in a Plane', 'Scalars and vectors, projectile motion, circular motion', 'theory', 70, 5),

('Physics', 11, 3, 'Laws of Motion', 'Newton Laws of Motion', 'Concept of force, Newton three laws, momentum conservation', 'theory', 80, 6),
('Physics', 11, 3, 'Laws of Motion', 'Friction and Circular Motion', 'Static and kinetic friction, dynamics of circular motion', 'mcq', 75, 7),

-- Chemistry lessons  
('Chemistry', 11, 1, 'Basic Concepts of Chemistry', 'Importance and Scope of Chemistry', 'General introduction, nature of matter, laws of chemical combination', 'theory', 50, 1),
('Chemistry', 11, 1, 'Basic Concepts of Chemistry', 'Atomic and Molecular Masses', 'Mole concept, percentage composition, empirical and molecular formula', 'theory', 60, 2),
('Chemistry', 11, 1, 'Basic Concepts of Chemistry', 'Stoichiometry', 'Chemical reactions and calculations based on stoichiometry', 'mcq', 70, 3),

('Chemistry', 11, 2, 'Structure of Atom', 'Discovery of Subatomic Particles', 'Discovery of electron, proton and neutron, atomic number, isotopes', 'theory', 60, 4),
('Chemistry', 11, 2, 'Structure of Atom', 'Atomic Models', 'Thomson, Rutherford and Bohr models and their limitations', 'theory', 70, 5),
('Chemistry', 11, 2, 'Structure of Atom', 'Electronic Configuration', 'Quantum numbers, orbital shapes, electron filling rules', 'mcq', 80, 6),

-- Biology lessons
('Biology', 11, 1, 'Diversity in Living World', 'What is Living?', 'Characteristics of living organisms, biodiversity', 'theory', 50, 1),
('Biology', 11, 1, 'Diversity in Living World', 'Classification and Taxonomy', 'Need for classification, taxonomical hierarchy, binomial nomenclature', 'theory', 60, 2),
('Biology', 11, 1, 'Diversity in Living World', 'Five Kingdom Classification', 'Classification of Monera, Protista, Fungi, Plantae, Animalia', 'mcq', 70, 3),

('Biology', 11, 2, 'Structural Organization', 'Morphology of Flowering Plants', 'Root, stem, leaf and flower structure', 'theory', 60, 4),
('Biology', 11, 2, 'Structural Organization', 'Anatomy of Flowering Plants', 'Tissue organization, primary and secondary growth', 'theory', 70, 5),

-- Mathematics lessons
('Mathematics', 12, 1, 'Relations and Functions', 'Types of Relations', 'Reflexive, symmetric, transitive and equivalence relations', 'theory', 60, 1),
('Mathematics', 12, 1, 'Relations and Functions', 'Functions', 'One to one and onto functions, composite functions, inverse functions', 'theory', 70, 2),
('Mathematics', 12, 1, 'Relations and Functions', 'Inverse Trigonometric Functions', 'Definition, range, domain, graphs of inverse trigonometric functions', 'mcq', 75, 3),

('Mathematics', 12, 2, 'Algebra', 'Matrices', 'Operations on matrices, types of matrices, determinants', 'theory', 70, 4),
('Mathematics', 12, 2, 'Algebra', 'Probability', 'Random experiments, sample spaces, probability of events', 'mcq', 80, 5),

-- English lessons
('English', 11, 1, 'Prose', 'Standing Up for Yourself', 'By Yevgeny Yevtushenko - Character development and self-assertion', 'theory', 50, 1),
('English', 11, 1, 'Prose', 'The Legend behind a Legend', 'By Hariharan Balakrishnan - Understanding legendary figures', 'theory', 55, 2),
('English', 11, 1, 'Prose', 'The Golden Touch', 'By Nathaniel Hawthorne - Moral lessons from mythology', 'theory', 60, 3),

('English', 11, 2, 'Poetry', 'Stopping by Woods on a Snowy Evening', 'By Robert Frost - Nature poetry and symbolism', 'theory', 55, 4),
('English', 11, 2, 'Poetry', 'The Inchcape Rock', 'By Robert Southey - Ballad form and moral themes', 'theory', 60, 5),

('English', 11, 4, 'Writing Skills', 'Writing Paragraphs', 'Developing ideas into coherent paragraphs', 'theory', 50, 6),
('English', 11, 4, 'Writing Skills', 'Letter Writing', 'Personal letters, official letters, business letters', 'mcq', 55, 7);