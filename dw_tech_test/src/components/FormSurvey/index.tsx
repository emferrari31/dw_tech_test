import { useEffect, useState } from 'react';

type FormSurveyProps = {
    onSubmit: (data: { notes: string }) => void;
    editingSurvey: Survey | null; // Accept editingSurvey prop
};

const FormSurvey = ({ onSubmit, editingSurvey }: FormSurveyProps) => {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (editingSurvey) {
            setNotes(editingSurvey.notes || '');
        } else {
            setNotes('');
        }
    }, [editingSurvey]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ notes });
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="notes">Notes: </label><br />
                <textarea
                    name="notes"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                    className="responsive-textarea"
                    rows={5}
                /> <br />
            </div>
            <button type="submit">{editingSurvey ? 'Update' : 'Submit'}</button>
        </form>
    );
};

export default FormSurvey;