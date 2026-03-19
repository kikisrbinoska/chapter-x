using MediatR;

namespace ChapterX.Application.AISuggestion.Commands
{
    public record UpdateRequest(
        int Id,
        string OriginalText,
        string SuggestedText,
        bool Accepted
    ) : IRequest<UpdateResponse>;
}
