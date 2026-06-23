using MediatR;

namespace ChapterX.Application.Chapter.Commands
{
    public record UpdateRequest(
        int Id,
        int Number,
        string Name,
        string Title,
        string Content,
        int? WordCount,
        int CallerId = 0
    ) : IRequest<UpdateResponse>;
}
