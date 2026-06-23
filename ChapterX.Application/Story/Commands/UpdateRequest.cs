using MediatR;

namespace ChapterX.Application.Story.Commands
{
    public record UpdateRequest(int Id, bool MatureContent, string ShortDescription, string? Image, string Content, int CallerId = 0) : IRequest<UpdateResponse>;
}
