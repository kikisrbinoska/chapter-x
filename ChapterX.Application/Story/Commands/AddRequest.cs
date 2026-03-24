using MediatR;

namespace ChapterX.Application.Story.Commands
{
    public record AddRequest(bool MatureContent, string ShortDescription, string? Image, string Content, int UserId, List<string> Genres) : IRequest<AddResponse>;
}
