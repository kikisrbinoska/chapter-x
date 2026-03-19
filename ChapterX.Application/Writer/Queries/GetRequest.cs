using MediatR;

namespace ChapterX.Application.Writer.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
