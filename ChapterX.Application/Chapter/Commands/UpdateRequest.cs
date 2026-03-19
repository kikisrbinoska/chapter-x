using MediatR;

namespace ChapterX.Application.Chapter.Commands
{
    public record UpdateRequest(
        int Id,
        int Number,
        string Name,
        string Title,
        string Content,
        int? WordCount
    ) : IRequest<UpdateResponse>;
}
