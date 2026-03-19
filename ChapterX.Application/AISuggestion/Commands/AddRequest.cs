using MediatR;

namespace ChapterX.Application.AISuggestion.Commands
{
    public record AddRequest(
        string OriginalText,
        string SuggestedText,
        int StoryId
    ) : IRequest<AddResponse>;
}
